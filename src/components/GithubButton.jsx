import React from 'react'
import GithubIcon from '../assets/github.svg'


const GithubButton = () => {

    const redirectToRepo = () => {
        const repoUrl = 'https://github.com/shivain2393/Memory-Game-React';
        window.open(repoUrl, '_blank');
      };

  return (
    <button className='github-btn' onClick={redirectToRepo}>
      <img src={GithubIcon} alt="" />
      <span>Repository</span>
    </button>
  )
}

export default GithubButton
