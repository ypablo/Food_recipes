import React, { Component } from 'react'
import Recipe from './Recipe';

export default class RecipeList extends Component {
    render() {
        return (
            <div>
                Hello from recipe list
                <Recipe />
            </div>
        )
    }
}
