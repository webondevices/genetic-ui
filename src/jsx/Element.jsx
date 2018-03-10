import React from 'react';

class Element extends React.Component {

    getText (length) {
        var text = '';
        var possible = 'ABCDE FGHIJ KLMNO PQRST UVWXY Zabcd efghi jklmn opqrst uvwxyz 01234 56789';
      
        for (var i = 0; i <= length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    render () {
        const {width,heigh,posit,anima,backg,trans,fsize,fcolo,cleng,ctawi,ctahe,ctabg,ctafc} = this.props.dna;
        const getLeft = () => {
            if (posit === 'left') { return '0';}
            if (posit === 'right') { return `calc(100% - ${width}vw)`;}
            if (posit === 'top' || posit === 'bottom') { return `calc(50% - ${width / 2}vw)`;}
        };

        const getTop = () => {
            if (posit === 'top') { return '0';}
            if (posit === 'bottom') { return `calc(100% - ${heigh}vh)`;}
            if (posit === 'left' || posit === 'right') { return `calc(50% - ${heigh / 2}vh)`;}
        };

        const containerStyle = {
            width: `${width}vw`,
            height: `${heigh}vh`,
            backgroundColor: `hsl(${Math.floor(backg[0])},${Math.floor(backg[1])}%,${Math.floor(backg[2])}%)`,
            left: getLeft(),
            top: getTop(),
            opacity: `${1 - trans}`
        };

        const textStyle = {
            fontSize: `${fsize}px`,
            color: `hsl(${Math.floor(fcolo[0])},${Math.floor(fcolo[1])}%,${Math.floor(fcolo[2])}%)`
        };

        const buttonStyle = {
            width: `${ctawi}%`,
            height: `${ctahe}%`,
            backgroundColor: `hsl(${Math.floor(ctabg[0])},${Math.floor(ctabg[1])}%,${Math.floor(ctabg[2])}%)`,
            color: `hsl(${Math.floor(ctafc[0])},${Math.floor(ctafc[1])}%,${Math.floor(ctafc[2])}%)`
        };

        const paragraphText = this.getText(cleng);

        return (
            <div className="container" style={containerStyle}>
                <p className="container-text" style={textStyle}>{paragraphText}</p>
                <button className="container-button" style={buttonStyle}>Click me!</button>
            </div>
        );
    }
}

export default Element;