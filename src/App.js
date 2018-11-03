import React, { Component } from 'react';
import Semester from './Semester';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            semesters:[],
            cgpa: null
        };
        this.add = this.add.bind(this);
        this.save = this.save.bind(this);
        this.nextID = this.nextID.bind(this);
        this.eachSemester = this.eachSemester.bind(this);
        this.calculateCGPA = this.calculateCGPA.bind(this);
    }

    nextID(){
        this.uniqueID = this.uniqueID || 1;
        return this.uniqueID++;
    }

    save(id, _credit, _grade){
        this.setState(
            prevState => ({
                ...prevState,
                semesters: prevState.semesters.map(
                    semester => (semester.id !== id) ? semester : {
                        ...semester,
                        credit: _credit,
                        grade: _grade
                    }
                )
            }),
            () => this.calculateCGPA()
        );
    }

    calculateCGPA(){
        let _cgpa = null;
        let totalCreditsOffered = 0;
        let totalSemesterGrade = 0;

        this.state.semesters.forEach((semester, i) => {
            if (semester.credit !== ""){
                totalCreditsOffered += parseInt(semester.credit);
            }
        });

        if (totalCreditsOffered > 0){
            this.state.semesters.forEach(semester => {
                if (semester.credit !== ""){
                    totalSemesterGrade += parseFloat(semester.grade);
                }
            });

            _cgpa = totalSemesterGrade/totalCreditsOffered;
            _cgpa = (Math.round(_cgpa * 100) / 100);
        }

        this.setState(
            prevState => ({
                ...prevState,
                cgpa: _cgpa
            })
        );
    }

    add(_credit, _grade){
        this.setState(
            prevState => ({
                semesters: [
                    ...prevState.semesters,
                    {
                        id: this.nextID(),
                        credit: _credit,
                        grade: _grade
                    }
                ]
            })
        )
    }

    eachSemester(semester, i){
        return (
            <Semester onChange={this.save} index={i+1} key={i+1}/>
        );
    }

    render() {
        return (
            <div className={"row"}>
                <div className={"offset-md-3 col-md-6"}>
                    {this.state.semesters.map(this.eachSemester)}
                    <div className={"row"}>
                        <div className={"col-12 text-center alert alert-success"}>
                            CGPA: {this.state.cgpa}
                        </div>
                        <div className={"col-12"}>
                            <button onClick={this.add.bind(null, null, null)} className={"btn"}>
                                <span><i className={"fa fa-plus text-success"}></i> Add Semester</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;