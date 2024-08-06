import { LuUser2 } from 'react-icons/lu'
import { MdOutlineQuiz, MdOutlineQuestionMark, MdOutlineQuestionAnswer } from 'react-icons/md'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { getDashboard } from '../../../../services/dashboardApiService'
import { useEffect, useState } from 'react'
import './Dashboard.scss'

const Dashboard = (props) => {
    const [data, setData] = useState(null)
    const [chartData, setChartData] = useState([])

    const fetchData = async () => {
        const res = await getDashboard()
        if (res && res.EC === 0) {
            setData(res.DT)

            setChartData([
                {
                    name: 'Total',
                    user: res?.DT?.users?.total ?? 0,
                    quiz: res?.DT?.others?.countQuiz ?? 0,
                    question: res?.DT?.others?.countQuestions ?? 0,
                    answer: res?.DT?.others?.countAnswers ?? 0
                }
            ])
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="dashboard-container">
            <h2 className="header">DashBoard</h2>
            <div className="dashboard-content">
                <div className="row mt-0">
                    <div className="col-4 pd-0">
                        <div className="total-container">
                            <div className="row mt-0">
                                <div className="col-6 pd-0">
                                    <div className="total-item border-right border-bottom">
                                        <div className="total-item-image user">
                                            <LuUser2 fontSize={24} />
                                        </div>
                                        <div className="mt-4">
                                            <p className="total-item-title">Total users</p>
                                            <h4 className="total-item-value">
                                                {data && data.users && data.users.total ? data.users.total : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 pd-0">
                                    <div className="total-item border-bottom">
                                        <div className="total-item-image quiz">
                                            <MdOutlineQuiz fontSize={24} />
                                        </div>
                                        <div className="mt-4">
                                            <p className="total-item-title">Total quizzes</p>
                                            <h4 className="total-item-value">
                                                {data && data.others && data.others.countQuiz ? data.others.countQuiz : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 pd-0">
                                    <div className="total-item border-right">
                                        <div className="total-item-image question">
                                            <MdOutlineQuestionMark fontSize={24} />
                                        </div>
                                        <div className="mt-4">
                                            <p className="total-item-title">Total questions</p>
                                            <h4 className="total-item-value">
                                                {data && data.others && data.others.countQuestions ? data.others.countQuestions : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 pd-0">
                                    <div className="total-item">
                                        <div className="total-item-image answer">
                                            <MdOutlineQuestionAnswer fontSize={24} />
                                        </div>
                                        <div className="mt-4">
                                            <p className="total-item-title">Total answers</p>
                                            <h4 className="total-item-value">
                                                {data && data.others && data.others.countAnswers ? data.others.countAnswers : 0}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="chart-container">
                            <h5 className="chart-title">Analystic Chart</h5>
                            <div className="chart-content">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="user" fill="#8884d8" />
                                        <Bar dataKey="quiz" fill="#82ca9d" />
                                        <Bar dataKey="question" fill="#ff7300" />
                                        <Bar dataKey="answer" fill="#413ea0" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard