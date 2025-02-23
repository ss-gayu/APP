import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../api/api'
import NewsItems from './NewsItems'
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaSearch } from "react-icons/fa";

const News = () => {

    const [search, setSearch] = useState("tesla")
    const [newsData, setNewsData] = useState([])
    const [page,setPage]=useState(1)
    const options = ["Business", "Technology", "Sports", "Innovation", "Culture", "Arts", "Travel", "Earth"]

    const fetchData = async () => {
        await getAllProducts(search,page).then((res) => {
            console.log(res.data.articles)
            setNewsData(prev=>[...prev,...res.data.articles])
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        console.log("fetch")
        fetchData()
    }, [page])

    const fetchNews=()=>{
        setPage(prev=>prev+1)
    }

    const searchNews=()=>{
        setNewsData([])
        setPage(1)
        fetchData()
    }
    return (
        <>
            <div className='h-100vh w-full'>
                <nav className='flex justify-between p-5 bg-black'>
                    <h4 className='text-red-400 text-2xl font-bold'>News</h4>
                    <div className='bg-white flex justify-center items-center'>
                        <input type="text" value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-[300px] h-[30px] bg-white p-2 outline-none'
                        ></input>
                        <FaSearch onClick={()=>searchNews()} className='text-md cursor-pointer'/>
                    </div>
                </nav>

                <div className='w-[1200px]  mx-auto mt-[40px]'>
                    <div className='flex justify-center items-center border-b-1 pb-[10px]'>
                        {
                            options.map((item, index) => {
                                return (
                                    <div className='bg-black text-red-300 mx-[20px] p-2 font-bold rounded-md'>
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <InfiniteScroll
                        dataLength={newsData.length} //This is important field to render the next data
                        next={fetchNews}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>No more articles</b>
                            </p>
                        }
                     scrollThreshold={0.9}
                    >
                        <div className='grid grid-cols-4 gap-5 mt-[40px]'>
                        <NewsItems newsData={newsData} />
                    </div>
                    </InfiniteScroll>
                   
                </div>

            </div>
        </>
    )
}

export default News