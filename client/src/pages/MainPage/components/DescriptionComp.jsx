import React from 'react';
import CleanDesignImg from '../images/CleanDesignImg.png'
import SecureDataImg from '../images/SecureDataImg.png'
import RetinaReadyImg from '../images/RetinaReadyImg.png'

const DescriptionComp = () => {
    const infoBlocksData = [
        {
            title: 'Clean Design',
            subtitle: 'Increase sales by showing true dynamics of your website.',
            image: CleanDesignImg
        },
        {
            title: 'Secure Data',
            subtitle: 'Build your online store’s trust using Social Proof & Urgency.',
            image: SecureDataImg
        },
        {
            title: 'Retina Ready',
            subtitle: 'Realize importance of social proof in customer’s purchase decision.',
            image: RetinaReadyImg
        }
    ]


    return (
        <div className='DescriptionSection'>
            <div className='Description'>
                <h1>Why <strong>small business owners <br/> love</strong> AppCo?</h1>
                <p>Our design projects are fresh and simple and will benefit your business greatly. Learn more about our
                    work!</p>
            </div>

            <div className='InfoBlock'>
                {infoBlocksData.map((item, index) => (
                    <div key={index}>
                        <img src={item.image} alt={item.title}/>
                        <h1>{item.title}</h1>
                        <p>{item.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DescriptionComp;