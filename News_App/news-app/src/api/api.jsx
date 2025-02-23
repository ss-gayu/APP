import axios from "axios";

const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

const apiClient = axios.create({
    baseURL: "https://newsapi.org/v2"
})

export const getAllProducts = (search, page) => apiClient.get(`/everything?q=${search}&apiKey=${API_KEY}&pageSize=12&page=${page}`)