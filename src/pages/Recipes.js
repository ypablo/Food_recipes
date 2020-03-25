import React, { Component } from 'react';
import RecipeList from '../components/RecipeList';
import Search from '../components/Search';
import { recipeData } from '../data/tempList';

const APP_ID = "6442f2c0"
const APP_KEY = "5f7f4d6e0c8d4e97ba27fa244a016b67"

export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.getRecipes = this.getRecipes.bind(this);
    }
    state = {
        recipes: recipeData,
        search: "",

        //url: `https://forkify-api.herokuapp.com/api/search?key=${REACT_APP_API_KEY}`,
        url: `https://api.edamam.com/search?q=curry&app_id=${APP_ID}&app_key=${APP_KEY}`,

        base_url: `https://api.edamam.com/search?q=curry&app_id=${APP_ID}&app_key=${APP_KEY}`,
        //base_url: `https://forkify-api.herokuapp.com/api/search?key=${REACT_APP_API_KEY}`,
        query: '&q=',
        error: ""
    }



    async getRecipes() {
        try {
            const data = await fetch(this.state.url);
            const jsonData = await data.json();
            if (jsonData.recipes.length === 0) {
                this.setState({
                    error: "I'm sorry but your search did not return any recipes, please try again."
                });
            } else {
                this.setState({
                    recipes: jsonData.recipes,
                    error: ""
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getRecipes();
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { base_url, query, search } = this.state;
        this.setState({
            url: `${base_url}${query}${search}`,
            search: ""
        },
            () => this.getRecipes()
        );
    }

    render() {
        return (
            <div>
                <Search
                    search={this.state.search}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />
                {this.state.error ? (
                    <section>
                        <div className="row">
                            <div className="col">
                                <h2 className="text-orange text-center text-uppercase mt-5">
                                    {this.state.error}
                                </h2>
                            </div>
                        </div>
                    </section>) : (
                        <RecipeList recipes={this.state.recipes} />)}
            </div>
        );
    }
}
