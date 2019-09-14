import React, { Component } from 'react';
import RecipeList from '../components/RecipeList';
import Search from '../components/Search';
import { recipeData } from '../data/tempList';

export default class Recipes extends Component {
    constructor(props) {
        super(props)

    }
    state = {
        recipes: recipeData,
        search: ""
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <Search
                    search={this.state.search}
                    handleChange={this.handleSubmit}
                    handleChange={this.handleChange} />
                <RecipeList recipes={this.state.recipes} />
            </div>
        )
    }
}
