import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useCallback } from 'react'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)

  // useCallback - create it only if something changes
  const fetchCocktail = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      const { drinks } = data
      if (drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
        } = drinks[0]
        let ingredients = []
        for (const property in drinks[0]) {
          if (property.includes('strIngredient')) {
            if (drinks[0][property]) {
              ingredients.push(drinks[0][property])
            }
          }
        }
        const newCocktail = {
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients,
        }
        setCocktail(newCocktail)
      } else {
        setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    fetchCocktail()
  }, [id, fetchCocktail])

  if (loading) {
    return <Loading />
  }

  if (!cocktail) {
    return (
      <section className='section section-center'>
        <h2 className='section-title'>no cocktail to display</h2>
      </section>
    )
  }

  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((ingredient, index) => {
              // check if current ingredient is the last one
              if (index + 1 === ingredients.length) {
                return <span key={index}>{ingredient}</span>
              } else {
                return <span key={index}>{ingredient},</span>
              }
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
