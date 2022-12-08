import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'


const Movies = () => {
    const { isLoading, error, data } = useQuery('movies', () =>
        axios.get('https://api.tvmaze.com/search/shows?q=all')
    )
    if (isLoading) {
        return <h3>Loading...</h3>
    }
    if (error) {
        return <h3>something went wrong...</h3>
    }

    return (
        <div className="movie">
            {data?.data.map((item, idx) => {
                const { name, id, rating, image } = item?.show
                return (
                    <Card className="movie-card bg-dark text-white p-2" key={idx}>
                        <Card.Img variant="top" src={image.medium} />
                        <div className="mt-1">
                            <Card.Title>{name}</Card.Title>
                        </div>
                        <div className="d-flex justify-content-between align-items-center ">
                            {rating.average ?
                                <>
                                    <div className="d-flex justify-content-between align-items-center gap-1">
                                        <i className='bx bxs-star star'></i>
                                        <span>{rating.average}</span>
                                    </div>
                                    <Button variant="#252525"
                                    >
                                        <NavLink to={`/movie/${id}`} className="text-white link">
                                            view
                                        </NavLink>
                                    </Button>
                                </>
                                :
                                <>
                                    <div className="d-flex justify-content-between align-items-center gap-1">
                                        <i className='bx bxs-star star'></i>
                                        <span>no rating</span>
                                    </div>
                                    <Button variant="#252525"
                                    >
                                        <NavLink to={`/movie/${id}`} className="text-white link">
                                            view
                                        </NavLink>
                                    </Button>
                                </>
                            }
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default Movies
