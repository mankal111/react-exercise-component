import React, { Component } from "react";
import { Exercise } from "../../src";

export default class extends Component {
    render() {
        return (
            <div style={{ width: 640, margin: "15px auto" }}>
                <h1>Exercise component demo</h1>
                <Exercise
                    title="test exercise"
                    description="this is a test exercise"
                    question={["\\text{Can you type $1$?}"]}
                    answerFields={[{ type: 'text-input', id: 'answer' }]}
                    checkAnswer={(a) => a.answer === '1' ? {isCorrect: true} : {isCorrect: false}}
                    generateNewValues={() => {}}
                    answerComment={[]}
                />
            </div>
        );
    }
}
