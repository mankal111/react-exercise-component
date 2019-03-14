import React, { Component } from "react";
import { render } from 'react-dom';
import { Exercise } from "../../src";

class Demo extends Component {
    render() {
        return (
            <div style={{ width: 640, margin: "15px auto" }}>
                <h1>Exercise component demo</h1>
                <Exercise
                    title="test exercise"
                    description="this is a test exercise"
                    question={"Can you type $1$?\nThis integral $\\int_0^\\infty e^x dx $ should be in a new line with 2 $\\LaTeX$ substrings."}
                    answerFields={[{ type: 'text-input', id: 'answer' }]}
                    checkAnswer={(a) => a.answer === '1' ? {isCorrect: true} : {isCorrect: false}}
                    generateNewValues={() => {}}
                    answerComment={[]}
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));