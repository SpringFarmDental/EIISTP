import React from 'react';
import './Startpage.css';
import { Link } from 'react-router-dom';
import img1 from '../images/grid.png';

const Startpage = () => {
    return (
        <>
            <div className='startpage'></div>
            <div className='startpageouter'>
                <div className='startpagenavbar'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/creator'>Creator</Link>
                    <Link to='/working'>Working</Link>
                </div>
                <hr />
                <div className='abouts'>
                    <div className='abtcontent'>
                        <h1>EIISTP</h1>
                        <h3>Emotionally Intelligent Interactive Story Telling Platform</h3>
                        <h2>A dynamic storytelling platform where users input their mood, and the application generates a personalized story based on that mood. Users can interact with the story, provide feedback through ratings, and continue reading further iterations of the story. It's a creative and engaging way for users to explore storytelling tailored to their emotions.</h2>

                        <Link to='/question'>
                            <button>START</button>
                        </Link>
                    </div>
                    <div>
                        <img src={img1} alt="EIISTP Image" />
                    </div>
                </div>
            </div>

        </>
    );
};

export default Startpage;
