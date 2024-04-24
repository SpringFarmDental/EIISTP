import React, { useState, useEffect } from 'react';
import './questionnaire.css';
import { Link } from 'react-router-dom';

const Questions = () => {
    const [formData, setFormData] = useState({
        feelingToday: 'select',
        moodAboutDay: 'select',
        feelingAboutWeek: 'select',
        currentEmotion: 'select',
        descriptionOfFeeling: 'select'
    });
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('submittedData');
        if (savedData) {
            setSubmittedData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Store the submitted data
        setSubmittedData(formData);

        const formDataString = JSON.stringify(formData);
        localStorage.setItem('submittedData', formDataString);

        // Reset the form after submission
        setFormData({
            feelingToday: 'select',
            moodAboutDay: 'select',
            feelingAboutWeek: 'select',
            currentEmotion: 'select',
            descriptionOfFeeling: 'select'
        });


    };

    return (
        <>

            <div className='startpage'></div>
            <div className='startpageouterq'>
                <h3>Let's know about you</h3>

                <form onSubmit={handleSubmit}>
                    <div className='questionnaire'>


                        <label>Which statement best describes your feeling right now?

                            <select name="descriptionOfFeeling" value={formData.descriptionOfFeeling} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="top-of-world">I'm on top of the world!</option>
                                <option value="hanging-in-there">I'm hanging in there.</option>
                                <option value="feeling-down">I'm feeling a bit down.</option>
                                <option value="struggling">I'm struggling a lot.</option>
                                <option value="not-sure">I'm not sure how I feel.</option>
                            </select>
                        </label>

                        <label>How do you feel about the upcoming week?

                            <select name="feelingAboutWeek" value={formData.feelingAboutWeek} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="optimistic">Optimistic</option>
                                <option value="anxious">Anxious</option>
                                <option value="neutral">Neutral</option>
                                <option value="excited">Excited</option>
                                <option value="dreadful">Dreadful</option>
                            </select>
                        </label>

                        <label>What's your current emotional state?

                            <select name="currentEmotion" value={formData.currentEmotion} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="relaxed">Relaxed</option>
                                <option value="overwhelmed">Overwhelmed</option>
                                <option value="calm">Calm</option>
                                <option value="frustrated">Frustrated</option>
                                <option value="bored">Bored</option>
                            </select>
                        </label>

                        <label>What's your mood about your day?

                            <select name="moodAboutDay" value={formData.moodAboutDay} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="great">Great!</option>
                                <option value="okay">Okay</option>
                                <option value="meh">Meh</option>
                                <option value="not-good">Not so good</option>
                                <option value="terrible">Terrible</option>
                            </select>
                        </label>


                        <label>How are you feeling today?

                            <select name="feelingToday" value={formData.feelingToday} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="happy">Happy</option>
                                <option value="content">Content</option>
                                <option value="stressed">Stressed</option>
                                <option value="sad">Sad</option>
                                <option value="excited">Excited</option>
                            </select>
                        </label>
                        <Link to='/Storypage' >
                            <button type='submit'>Submit</button>
                        </Link>
                    </div>
                </form>

  
            </div>
        </>
    );
};

export default Questions;
