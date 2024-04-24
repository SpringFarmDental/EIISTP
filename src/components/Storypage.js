import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Storypage.css';
import { Link } from 'react-router-dom';

const Storypage = () => {
    const [submittedData, setSubmittedData] = useState("");
    const [userRating, setUserRating] = useState(null);
    const [userRating1, setUserRating1] = useState(null);
    const [storyContent, setStoryContent] = useState("");
    const [storyContentsec, setStoryContentsec] = useState("");
    const [storyContentthird, setStoryContentthird] = useState("");
    const [showRating, setShowRating] = useState(false);
    const [showRating1, setShowRating1] = useState(false);
    const [lastcreated, setLastcreated] = useState(false);
    const [iteration, setIteration] = useState('');
    const [iteration1, setIteration1] = useState('');

    useEffect(() => {
        const savedData = localStorage.getItem('submittedData');
        if (savedData) {
            setSubmittedData(JSON.parse(savedData));
        }
    }, []);

    var mood;

    async function sendMood() {
        // Get the mood element
        const moodElement = document.getElementById('mood');
        if (moodElement) {
            mood = moodElement.innerText;
            const pretext = "I am feeling like this";
            const posttext = "brief story introduction use fictional characters to describe the plot which should be related to mood and make it open ended with three dots in end";

            var sendtoapi = pretext + " " + mood + " " + posttext;

            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyATwCyRPGuBJAPckf2QPEjS0rMkMpoTQSg",
                method: "Post",
                data: {
                    contents: [
                        {
                            parts: [
                                { text: sendtoapi }
                            ]
                        },
                    ]
                }
            });

            const apiResponse = response.data.candidates[0].content.parts[0].text;
            setStoryContent(apiResponse);
            setShowRating(true); // Show the rating after content is generated

            // Hide the mood section
            moodElement.style.display = "none";
        } else {
            console.error("Element with id 'mood' not found");
        }
    }

    const handleRatingChange = (e) => {
        setUserRating(e.target.value);
    };
    const handleRatingChange1 = (e) => {
        setUserRating1(e.target.value);
    };

    async function seciter() {
        var iter = document.getElementById('iter1').innerText;
        setIteration(iter);

        const posttext = " This describes the user's current mood, the story they are reading, and their relatability rating with the story. Based on this information, generate further story content. The story should not end, start story from begining";

        var sendtoapi = iter + " " + posttext;

        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyATwCyRPGuBJAPckf2QPEjS0rMkMpoTQSg",
            method: "Post",
            data: {
                contents: [
                    {
                        parts: [
                            { text: sendtoapi }
                        ]
                    },
                ]
            }
        });

        const apiResponse = response.data.candidates[0].content.parts[0].text;
        setStoryContentsec(apiResponse);
        setShowRating1(true)

        document.getElementById('iter1').style.display = "none";
    }

    async function thirditer() {
        var iterElement = document.getElementById('iter2');
        if (iterElement) {
            var iter = iterElement.innerText;
            setIteration1(iter);

            const posttext = "there is a numeric value at the end, if the value is less than 5 make a motivational ending to the story otherwise make a happy ending to the story, start story from begining";

            var sendtoapi = iter + " " + posttext;

            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyATwCyRPGuBJAPckf2QPEjS0rMkMpoTQSg",
                method: "Post",
                data: {
                    contents: [
                        {
                            parts: [
                                { text: sendtoapi }
                            ]
                        },
                    ]
                }
            });

            const apiResponse = response.data.candidates[0].content.parts[0].text;
            setStoryContentthird(apiResponse);

            document.getElementById('iter2').style.display = "none"
        } else {
            console.error("Element with id 'iter2' not found");
        }

        setLastcreated(true)
    }

    async function getSentiments() {
        var finalStory = document.getElementById('moodtestfinal').innerText;

        const posttext = "this is a story written by  user, analyse the story and based on it detect different emotions of user and percentage of those emotions, also tell users positive current state at the end in two words";

        var sendtoapi = finalStory + " " + posttext;

        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyATwCyRPGuBJAPckf2QPEjS0rMkMpoTQSg",
            method: "Post",
            data: {
                contents: [
                    {
                        parts: [
                            { text: sendtoapi }
                        ]
                    },
                ]
            }
        });

        const emotionsApi = response.data.candidates[0].content.parts[0].text;
        const analysedEmotions = JSON.stringify(emotionsApi);
        localStorage.setItem('Emotions', analysedEmotions);
        window.location.href = '/Analysis'; // Redirect to the analysis page
    }

    return (
        <>
            <div className='startpage'></div>
            <div className='startpageouters'>
                <div id='iter1'>
                    <div id='mood'>
                        <p>
                            It seems you're experiencing a range of emotions today. You're feeling <strong>{submittedData.feelingToday}</strong>, <strong>{submittedData.moodAboutDay}</strong> about the day, and <strong>{submittedData.feelingAboutWeek}</strong> about the week. Currently, you're feeling <strong>{submittedData.currentEmotion}</strong>. Your description of feeling is <strong>{submittedData.descriptionOfFeeling}</strong>. Let's create a story that suits you best.
                        </p>
                        <button onClick={sendMood}>Create Story</button>
                    </div>
                    <div id='moodtest' >{storyContent}</div>
                    {showRating && (
                        <div id='hownow'>
                            <div className='hownowinner'>
                                <label htmlFor="rating">Do you like the story
                                    <input
                                        type="range"
                                        id="rating"
                                        name="rating"
                                        min="1"
                                        max="10"
                                        onChange={handleRatingChange}
                                        value={userRating}
                                    />
                                </label>
                                <span>{userRating}</span>
                                <button onClick={seciter}>Continue</button>
                            </div>
                        </div>
                    )}
                </div>
                <div id='iter2'>
                    <div id='moodtest'></div>
                    <div id='storybegining'>{storyContentsec}</div>
                    {showRating1 && (
                        <div id='hownow'>
                            <div className='hownowinner1'>
                                <label htmlFor="rating">How do you feel now
                                    <input
                                        type="range"
                                        id="rating"
                                        name="rating"
                                        min="1"
                                        max="10"
                                        onChange={handleRatingChange1}
                                        value={userRating1}
                                    />
                                </label>
                                <span>{userRating1}</span>
                                <button onClick={thirditer} >Get more</button>
                            </div>
                        </div>
                    )}
                </div>
                {lastcreated && (  
                    <>
                        <div id='moodtestfinal'>{storyContentthird}</div>
                        {localStorage.getItem('Emotions') ? (
                            <Link to='/Analysis'>
                                <button>ANALYSE EMOTIONS</button>
                            </Link>
                        ) : (
                            <button onClick={getSentiments}>ANALYSE EMOTIONS</button>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Storypage;
