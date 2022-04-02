import React from 'react'
import ReactLoading from 'react-loading';
import styled from 'styled-components';

interface Props {
    isLoading: boolean;
}


const Loading = ({ isLoading }: Props) => {

    if (!isLoading) return <></>;
    return (
        <LoadingContainer>
            <ReactLoading type='bubbles' color='#1cb954' height={150} width={150} />
        </LoadingContainer >
    )
}

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    position: absolute;
    background: rgba(0,0,0,0.9);
`;

export default Loading;