import React, { Component } from 'react';
import Course from './Course';


class Semester extends Component{
    constructor(props){
        super(props);
        this.state = {
            courses:[],
            gpa: null
        };
        this.grades = new Map([
            ['A', 4],
            ['A-', 3.7],
            ['B+', 3.3],
            ['B', 3],
            ['B-', 2.7],
            ['C+', 2.3],
            ['C', 2],
            ['C-', 1.7],
            ['D+', 1.3],
            ['D', 2],
            ['D-', 0.7],
            ['F', 0]
        ]);
        this.add = this.add.bind(this);
        this.save = this.save.bind(this);
        this.nextID = this.nextID.bind(this);
        this.eachCourse = this.eachCourse.bind(this);
        this.calculateGPA = this.calculateGPA.bind(this);
    }

    nextID(){
        this.uniqueID = this.uniqueID || 0;
        return this.uniqueID++;
    }

    save(id, _credit, _grade){
        this.setState(
            prevState => ({
                ...prevState,
                courses: prevState.courses.map(
                    course => (course.id !== id) ? course : {
                        ...course,
                        credit: _credit,
                        grade: _grade
                    }
                )
            }),
            () => this.calculateGPA()
        );
    }

    calculateGPA(){
        let _gpa = null;
        let totalCreditsOffered = 0;
        let totalSemesterGrade = 0;

        this.state.courses.forEach((course, i) => {
            if (course.credit !== ""){
                totalCreditsOffered += parseInt(course.credit);
            }
        });

        if (totalCreditsOffered > 0){
            this.state.courses.forEach(course => {
                if (course.credit !== ""){
                    totalSemesterGrade += (course.credit * this.grades.get(course.grade));
                }
            });

            _gpa = totalSemesterGrade/totalCreditsOffered;
            _gpa = (Math.round(_gpa * 100) / 100);
        }

        this.setState(
            prevState => ({
                ...prevState,
                gpa: _gpa
            })
        );

        this.props.onChange(this.props.index, totalCreditsOffered, totalSemesterGrade);
    }

    add(_credit, _grade){
        this.setState(
            prevState => ({
                courses: [
                    ...prevState.courses,
                    {
                        id: this.nextID(),
                        credit: _credit,
                        grade: _grade
                    }
                ]
            })
        )
    }

    eachCourse(course, i){
        return (
            <Course onChange={this.save} index={i} key={i}/>
        );
    }

    render() {
        return (
            <div className={"card mb-5"}>
                <div className={"card card-header"}>
                    <p className={"card card-title text-center bd-secondary text-uppercase"}>
                        Semester { this.props.index }
                    </p>
                </div>
                <div className={"card card-body"}>
                    {this.state.courses.map(this.eachCourse)}
                    <div onChange={this.save} className={"col-12 text-center alert alert-success"}>
                        GPA: {this.state.gpa}
                    </div>
                </div>
                <div className={"card card-footer"}>
                    <button onClick={this.add.bind(null, null, null)} className={"btn"}>
                        <span><i className={"fa fa-plus text-primary"}></i></span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Semester;