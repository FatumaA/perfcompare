import { render } from "@testing-library/react"
import React from "react"

import CompareSearchDropdown from "./CompareSearchDropdown"

class CompareSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: ""
        }
    }
    
    handleChange = (event) => {
        // console.log(event.target.value)
        let search = event.target.value
        this.setState({
            searchValue: search
        })
    }

    render() {
        return (
        <div className="mzp-c-form mzp-l-stretch">
            <label className="mzp-c-field-label">
            {"Select a revision to compare:"}
            <input
                type="search"
                className="mzp-c-field-control"
                placeholder="Search by revision ID, author, or commit message"
                onChange={this.handleChange}
            />
            </label>
            {
                this.state.searchValue.length > 0 &&
                <CompareSearchDropdown data={this.props.data.try}/>
            }
        </div>
        )

    }

}

export default CompareSearch