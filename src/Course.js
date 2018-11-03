import React, { Component } from 'react';


class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            disabled: true
        };
        this.save = this.save.bind(this);
    }

    save(e){
        e.preventDefault();
        this.setState({
            disabled: this._credits.value === ""
        });

        this.props.onChange(this.props.index, this._credits.value, this._grade.value);
    }

    render() {
        return (
            <div className={"row"}>
                <div className="form-group col-6">
                    <label htmlFor="credits">Credits:</label>
                    <input type="number" onChange={this.save} className="form-control" id="credits" ref={input => this._credits = input}/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="grade">Select list:</label>
                    <select className="form-control" onChange={this.save} id="grade" ref={input => this._grade = input} disabled={this.state.disabled}>
                        <option>A</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B</option>
                        <option>B-</option>
                        <option>C+</option>
                        <option>C</option>
                        <option>C-</option>
                        <option>D+</option>
                        <option>D</option>
                        <option>D-</option>
                        <option>F</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Course;