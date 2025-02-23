import React from 'react'

const NewsItems = ({newsData}) => {
    console.log(newsData)
  return (
   <>
   {
    newsData.map((item,index)=>{
        return(
            <div key={index} className='bg-black text-white rounded-md shadow-xl relative transform transition-all duration-300 hover:scale-105 cursor-pointer'>
                <img src={item.urlToImage} alt="news Image" className='h-[180px] w-full opacity-[0.3]'></img>
                <div className='absolute bottom-2 p-2'>
                    <h4>{item.title}</h4>
                    <a href={item.url} className='text-red-400 underline'>Read More</a>
                </div>
            </div>
        )
    })
   }
   </>
  )
}

export default NewsItems