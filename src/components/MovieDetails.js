import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useQuery } from 'react-query'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MovieDetails = () => {
    const getLocalStorageData = JSON.parse(
        localStorage.getItem("moviedetails") || "[]"
    );
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [storeData, setStoreData] = useState(getLocalStorageData);

    const [input, setInput] = useState({
        name: '', phone: ''
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const userDetails = (name, status, lang, run) => {
        if (!input.name || !input.phone) {
            alert("somting is missing");
            return;
        }
        const details = {
            movieName: name,
            status: status,
            lang: lang,
            runtime: run,
            userName: input.name,
            userPhone: input.phone
        }
        setStoreData([...storeData, details])
        localStorage.setItem("moviedetails", JSON.stringify(storeData));
        input.name = ''
        input.phone = ""
        handleClose()

    }
    const params = useParams()
    const { id } = params
    const { isLoading, error, data } = useQuery('details', () =>
        axios.get(`https://api.tvmaze.com/shows/${id}`)
    )
    if (isLoading) {
        return <h3>Loading...</h3>
    }
    if (error) {
        return <h3>something went wrong...</h3>
    }


    return (
        <div className="cont">
            <div className="img-container">
                <img src={data?.data?.image?.medium} className="img" />
            </div>
            <div className="movie-details-container">
                <div className="movie-name-container">
                    <h3>{data?.data.name}</h3>
                    <span className="d-flex align-items-center gap-2 fs-5">Rantings :  {data?.data?.rating.average ?
                        <div className="d-flex justify-content-between align-items-center gap-1">
                            <i className='bx bxs-star star'></i>
                            <span>{data?.data?.rating?.average}</span>
                        </div>
                        :
                        <div className="d-flex justify-content-between align-items-center gap-1">
                            <i className='bx bxs-star star'></i>
                            <span>no rating</span>
                        </div>
                    }
                    </span>
                </div>
                <div className="movie-details">
                    <span>Status : {data?.data?.status}</span>
                    <span>Genres :{data?.data?.genres.join(', ')}</span>
                    <span>Language : {data?.data?.language}</span>
                    <span>Runtime : {data?.data?.runtime} Min</span>
                    <span>Premiered : {data?.data?.premiered}</span>
                    <a href={data?.data?.url} target="blank">official Site : {data?.data?.url}</a>
                    <span>Summary : {data?.data?.summary}</span>
                </div>
                <div className="mt-5 d-flex justify-content-end">
                    <Button onClick={handleShow}>Book Now</Button>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Book Show</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex gap-3 align-items-start w-100 flex-wrap">
                    <div className="">
                        <img src={data?.data?.image?.medium} className="" />
                    </div>
                    <div className="d-flex justify-content-center flex-column fs-5">
                        <span>Movie Name : {data?.data?.name}</span>
                        <span>Status : {data?.data?.status}</span>
                        <span>Language : {data?.data?.language}</span>
                        <span>Runtime : {data?.data?.runtime} Min</span>
                        <div className="mt-3 d-flex w-100 flex-column gap-2">
                            <input type="text" name="name" value={input.name} placeholder="enter name" onChange={handleInput}
                                className="p-1"
                            />
                            <input type="tel" name="phone" value={input.phone} placeholder="enter phone" onChange={handleInput}
                                className="p-1"
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={() => userDetails(
                        data?.data?.name,
                        data?.data?.status,
                        data?.data?.language,
                        data?.data?.runtime,

                    )}>Book</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MovieDetails
