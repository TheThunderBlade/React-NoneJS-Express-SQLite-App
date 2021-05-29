import React, {useEffect, useState} from 'react';
import Header from "../../сommonСomponents/Header";
import Footer from "../../сommonСomponents/Footer";
import './StatsPage.scss'
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";

const StatsPage = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage]  = useState(50)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await axios.post(`/api/user/userData`)
                setPosts(response.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div>
            <Header location='User statistic'/>

            <div className='UserStatisticSection'>
                <h1>Users statistics</h1>
                <Posts posts={currentPost} loading={loading}/>
                <Pagination
                    postsPerPage={postPerPage}
                    totalPosts={posts.length}
                    currentPage={currentPage}
                    setCurrentPageHandler={setCurrentPage}
                />
            </div>

            <Footer/>
        </div>
    );
};

export default StatsPage;