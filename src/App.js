import './assects/App.css'
import Questions from './assects/index'
import { useState, useEffect } from 'react'
import { produce } from 'immer'

const answerArray = []
function App() {
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        Questions()
            .then((res) => {
                setQuestion(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleclick = (val, index, arr, e) => {
        const data = arr.filter((e) => e === val)
        question.map((res, index) => {
            if (res.questionId === e.questionId) {
                setQuestion(
                    produce(question, (update) => {
                        update[index].answers = data
                    })
                )
            }
        })
        answerArray.push(val)
        let uniqueArr = [...new Set(answerArray)]
        setAnswers(uniqueArr)
    }

    if (answers.length >= 5) {
        return <App1 question={question} answers={answers} />
    } else {
        return (
            <div className="questionBox container">
                <div className="title">Quiz App</div>
                {question.map((e) => {
                    return (
                        <div
                            className="question questionBox"
                            key={e.questionId}
                        >
                            {e.question}
                            <br />

                            {e.answers.map((val, index, arr) => {
                                return (
                                    <button
                                        key={val}
                                        className="answerBtn "
                                        onClick={() =>
                                            handleclick(val, index, arr, e)
                                        }
                                    >
                                        {val}
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default App

export const App1 = ({ question, answers }) => {
    const [result, setResult] = useState(0)

    useEffect(() => {
        var j = 0
        for (let i = 0; i < answers.length; i++) {
            if (question[i].correct === answers[i]) {
                console.log(answers[i])
                j = j + 1
                console.log(j)
            }
        }
        setResult(j)
    }, [answers, question])

    const reloadfunc = () => {
        return window.location.reload()
    }
    return (
        <div className="questionBox container">
            <div className="score-board">
                <div className="score">
                    You scored {result} / 5 correct answers!
                </div>
                <button className="playBtn" onClick={reloadfunc}>
                    Play again!
                </button>
            </div>
        </div>
    )
}
