import React from 'react'
import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory.component';
import './homepage.styles.scss'

const Home = () => (
    <div className='homepage'>
        <Directory />
        <Outlet />
    </div>
)

export default Home;