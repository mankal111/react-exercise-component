import React from "react"
import {Paper, Button, withStyles} from "@material-ui/core"
import 'katex/dist/katex.min.css'
import {InlineMath} from "react-katex"
//import Solution from "./Solution";

const styles = {
    root: {
        maxWidth: 600,
        padding: 18
    },
    title: {
        margin: 0
    }
}

export class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {solutionVisible: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.toggleSolution = this.toggleSolution.bind(this);
        this.newExercise = this.newExercise.bind(this);
    }

    handleChange(event) {
        const answerFields = {
            ...this.state.answerFields,
            [event.target.name]: event.target.value
        }
        this.setState({ answerFields });
    }

    handleSubmit(event) {
        const checkAnswerObject = this.props.checkAnswer(this.state.answerFields);
        if (checkAnswerObject.isCorrect) {
            if (window.confirm("Correct!\nDo you want to try this exercise with new values?")) {
                this.newExercise();
            };
        } else {
            alert(checkAnswerObject.message);
        }
        event.preventDefault();
    }

    // toggleSolution() {
    //     this.setState({ solutionVisible: !this.state.solutionVisible })
    // }

    newExercise() {
        this.props.generateNewValues();
        this.resetInputFields();
        this.setState({ solutionVisible: false });
    }

    inputElements() {
        return this.props.answerFields.map((answerComponent, i) => {
            if (answerComponent.type === "text-input") {
                return <input
                    type="text"
                    value={this.state.answerFields[answerComponent.id]}
                    onChange={this.handleChange}
                    className="decimal"
                    name={answerComponent.id}
                    key={i}
                />
            } else if (answerComponent.type === "select-correct") {
                return typeof answerComponent.correct !== 'undefined' ? <select 
                    key={i}
                    onChange={this.handleChange}
                    name={`${i}-selected-item`}
                    value={this.state[`${i}-selected-item`]}
                >
                    {answerComponent.items.map((item, i) => <option key={i} value={i}>{item}</option>)}
                </select> : null;
            } else if (answerComponent.type === "text") {
                // return <InlineMath key={i} math={answerComponent.content} />
                return <div>{answerComponent.content}</div>
            }
        })
    }

    resetInputFields() {
        const answerFields = { ...this.state.answerFields };
        this.props.answerFields.forEach((answerComponent, i) => {
            if (answerComponent.type === "text-input") {
                answerFields[answerComponent.id] = '';
            } else if (answerComponent.type === "select-correct") {
                answerFields[answerComponent.id] = 0;
            }
        })
        this.setState({answerFields})
    }

    componentWillMount() {
        this.resetInputFields();
    }

    questionComponent(rawQuestion) {
        let questionArray = rawQuestion.split('\n');
        questionArray = questionArray.map((line) => {
            let parts = line.split(/\$/g).filter(i => i!='$');

            for (var i = 1; i < parts.length; i += 2) {
                parts[i] = <InlineMath key={i} math={parts[i]} />;
            }
            return parts;
        })
        return <div>{questionArray.map(i => <div>{i}</div>)}</div>
    }

    render() {
        const { title, description, question, answerComment, classes } = this.props;
        return <Paper className={classes.root}>
            <h2 className={classes.title}>{title}</h2>
            <div>{description}</div>
            <div>
                {this.questionComponent(question)}
            </div>
            <div>
                {answerComment.map((item, i) => <div key={i}>{item}</div>)}
            </div>
            <div className="answer-section">
                {this.inputElements()}
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
            >
                Check
            </Button>
            {this.props.solution && <span className="button" onClick={this.toggleSolution}>Solution</span>}
            <Button
                variant="contained"
                color="primary"
                onClick={this.newExercise}
            >
                New Exercise
            </Button>
            {/* {this.state.solutionVisible && <Solution steps={this.props.solution}/>} */}
        </Paper>;
    }
}

export default withStyles(styles)(Exercise);