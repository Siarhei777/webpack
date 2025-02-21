/***********************************************************/
/* Initialization of photo containers and item parameters. */
/***********************************************************/
import img1 from '../img/shlem.jpg';
import img2 from '../img/mech.jpg';
import img3 from '../img/bronya.jpg';
import img4 from '../img/gloves.jpg';
import img5 from '../img/kolco.jpg';
import img6 from '../img/sapogi.jpg';
import img7 from '../img/shtany.jpg';
import img8 from '../img/schit.jpg';
import img9 from '../img/amulet.jpg';
import img10_2 from '../img/spearinv.jpg';
import img10_3 from '../img/lionspear2.jpg';
import img5_3 from '../img/liongring2.jpg';

import bigImg1 from '../img/shlembig.jpg';
import bigImg2 from '../img/mechbig.jpg';
import bigImg3 from '../img/bronyabig.jpg';
import bigImg4 from '../img/glovesbig.jpg';
import bigImg5 from '../img/kolcobig.jpg';
import bigImg6 from '../img/sapogibig.jpg';
import bigImg7 from '../img/shtanybig.jpg';
import bigImg8 from '../img/schitbig.jpg';
import bigImg9 from '../img/amuletbig.jpg';
import bigImg10_2 from '../img/spearbig.jpg';
import bigImg10_3 from '../img/lionspear.jpg';
import bigImg5_3 from '../img/lionring.jpg';

import changeAll from './change_all';

export default (data, type, numNow) => {   

    const allData = (type == 1) ? data.filter(el => (el.now instanceof Array && el.now.indexOf(numNow) != -1)) : data;
    
    let elements;
    const container = document.querySelector('.all__items-container');

    if (!type) {        

        data.forEach(() => {
            const el = document.createElement('div');
            el.classList.add('preview');
            el.setAttribute('data-bs-toggle', 'modal');
            el.setAttribute('data-bs-target', '#mainModal');
            container.append(el);
        });
        
        elements = document.querySelectorAll('.all__items-container>div');

        container.style.width = `${100 * Math.ceil((Array.from(elements).filter(el => getComputedStyle(el).display == 'block')).length / 12)}%`;
        container.style.gridTemplateColumns = `repeat(${Math.ceil((Array.from(elements).filter(el => getComputedStyle(el).display == 'block')).length / 12)}, 1fr 1fr)`;                

        changeAll(data);
    }

    const allElements = (type == 1) ? document.querySelectorAll('#field1>div') : (type == 2) ? document.querySelectorAll('#field2>div') : elements;
    
    if (type == 2 || type == 1) {
        allElements.forEach(el => {
            el.innerHTML = '';
            el.style = '';
            el.setAttribute('data-bs-target', '');
            el.setAttribute('data-bs-toggle', '');
            el.setAttribute('data-atr', '');
            delete el.parameters;
            delete el.image;
            delete el.bigImage;            
        });          
        document.querySelectorAll(`#field${type} span`).forEach(el => el.remove());
    }    
    


    if (type == 2 && allData.length > 0) {
        allElements.forEach(el => {
            el.setAttribute('data-bs-target','#mainModal');
            el.setAttribute('data-bs-toggle','modal');
            el.setAttribute('data-atr', 'hovered');
        });
    }
    
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
    const bigImages = [bigImg1, bigImg2, bigImg3, bigImg4, bigImg5, bigImg6, bigImg7, bigImg8, bigImg9];
    let numRing = -1;
    
    const createInfo = (el) => {
        let str = '<div>';
        let checkCommand = 0;
        str += `<p>${el.name}</p>`;

        Object.keys(el).forEach(prop => {
            checkCommand = (el[prop].commandValue) ? ++checkCommand : checkCommand;
            if (el[prop].value || el[prop].value === 0) {
                
                if (parseInt(el[prop].value) > 0) {
                    str += `<p>${el[prop].name}: +${el[prop].value}</p>`;
                } else if (parseInt(el[prop].value) < 0) {
                    str += `<p>${el[prop].name}: ${el[prop].value}</p>`;
                }
            }            
        });
        
        if (checkCommand) {
            str += `<p class="danger-text">Действует на команду:</p>`;

            Object.keys(el).forEach(prop => {
                if (el[prop].commandValue) {                
                    if (parseInt(el[prop].commandValue) > 0) {
                        str += ` <p>${el[prop].name}: +${el[prop].commandValue}</p>`;
                    } else if (parseInt(el[prop].commandValue) < 0) {
                        str += ` <p>${el[prop].name}: ${el[prop].commandValue}</p>`;
                    }
                }   
            });

        }
        str += `<p>Уровень вещи: ${el.level}</p>`;
        str += '</div>';
        return str;
    };

    const initModal = () => {
        event.preventDefault();        
        document.getElementById('mainModalLabel').innerHTML = event.currentTarget.parameters.name;
        document.getElementById('modal-image').src = event.currentTarget.bigImage;
        document.querySelector('#mainModal .modal-body .info').innerHTML = createInfo(event.currentTarget.parameters);
    }

    allElements.forEach(el => {
        
        el.addEventListener('click', initModal);    
                
        if (type) {
            el.addEventListener('mouseenter', () => {            
                if (type && event.target.getAttribute('data-atr') !== 'hovered') return;
                event.target.style.backgroundImage = `url(${event.target.bigImage})`;            
            });
            el.addEventListener('mouseleave', () => {            
                if (type && event.target.getAttribute('data-atr') !== 'hovered') return;
                event.target.style.backgroundImage = event.target.image;            
            });    
        }        
        
    });
    if (type) {
        allData.forEach(element => {
            switch (element.type) {
                case 1:
                case 2:
                case 3:
                case 4:            
                    allElements[element.type - 1].parameters = element;    
                    allElements[element.type - 1].style.backgroundImage = `url(${images[element.type - 1]})`;
                    allElements[element.type - 1].image = `url(${images[element.type - 1]})`;
                    allElements[element.type - 1].bigImage = bigImages[element.type - 1];
                    allElements[element.type - 1].innerHTML = createInfo(element);
                    allElements[element.type - 1].setAttribute('data-bs-target','#mainModal');
                    allElements[element.type - 1].setAttribute('data-bs-toggle','modal');
                    allElements[element.type - 1].setAttribute('data-atr', 'hovered');
                    break;
                case 6:    
                case 7:
                case 8:
                case 9:
                    allElements[element.type].parameters = element;    
                    allElements[element.type].style.backgroundImage = `url(${images[element.type - 1]})`;
                    allElements[element.type].image = `url(${images[element.type - 1]})`;
                    allElements[element.type].bigImage = bigImages[element.type - 1];
                    allElements[element.type].innerHTML = createInfo(element);
                    allElements[element.type].setAttribute('data-bs-target','#mainModal');
                    allElements[element.type].setAttribute('data-bs-toggle','modal');
                    allElements[element.type].setAttribute('data-atr', 'hovered');
                    break;
                case 5:
                    allElements[4 + ++numRing].parameters = element;    
                    allElements[4 + numRing].innerHTML = createInfo(element);                
                    allElements[4 + numRing].setAttribute('data-bs-target','#mainModal');
                    allElements[4 + numRing].setAttribute('data-bs-toggle','modal');
                    allElements[4 + numRing].setAttribute('data-atr', 'hovered');
                    if (element.complect != 3) {
                        allElements[4 + numRing].style.backgroundImage = `url(${images[4]})`;
                        allElements[4 + numRing].image = `url(${images[4]})`;
                        allElements[4 + numRing].bigImage = bigImages[4];
                    } else {
                        allElements[4 + numRing].style.backgroundImage = `url(${img5_3})`;                    
                        allElements[4 + numRing].image = `url(${img5_3})`;                    
                        allElements[4 + numRing].bigImage = bigImg5_3;
                    }                
                    break;
                case 10:                
                    allElements[1].parameters = element;    
                    allElements[1].innerHTML = createInfo(element);                
                    allElements[1].setAttribute('data-bs-target','#mainModal');
                    allElements[1].setAttribute('data-bs-toggle','modal');
                    allElements[1].setAttribute('data-atr', 'hovered');
                    allElements[8].parameters = element;  
                    allElements[8].innerHTML = createInfo(element);
                    allElements[8].setAttribute('data-bs-target','#mainModal');
                    allElements[8].setAttribute('data-bs-toggle','modal');
                    allElements[8].setAttribute('data-atr', 'hovered');
                    if (element.complect == 2) {
                        allElements[1].style.backgroundImage = `url(${img10_2})`;
                        allElements[8].style.backgroundImage = `url(${img10_2})`;   
                        allElements[1].image = `url(${img10_2})`;
                        allElements[8].image = `url(${img10_2})`;   
                        allElements[1].bigImage = bigImg10_2; 
                        allElements[8].bigImage = bigImg10_2; 
                    } else if (element.complect == 3) {
                        allElements[1].style.backgroundImage = `url(${img10_3})`;
                        allElements[8].style.backgroundImage = `url(${img10_3})`;    
                        allElements[1].image = `url(${img10_3})`;
                        allElements[8].image = `url(${img10_3})`;    
                        allElements[1].bigImage = bigImg10_3; 
                        allElements[8].bigImage = bigImg10_3; 
                    }                
                    break;
            }        
        });    
    } else {
        let count = 0;
        
        allData.forEach(element => {
            allElements[count].parameters = element;                
            allElements[count].innerHTML = createInfo(element);

            switch (element.type) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 6:
                case 7:
                case 8:
                case 9:
                    allElements[count].style.backgroundImage = `url(${images[element.type - 1]})`;
                    allElements[count].image = `url(${images[element.type - 1]})`;
                    allElements[count].bigImage = bigImages[element.type - 1];
                    break;
                case 5:
                    if (element.complect != 3) {
                        allElements[count].style.backgroundImage = `url(${images[4]})`;
                        allElements[count].image = `url(${images[4]})`;
                        allElements[count].bigImage = bigImages[4];
                    } else {
                        allElements[count].style.backgroundImage = `url(${img5_3})`;                    
                        allElements[count].image = `url(${img5_3})`;                    
                        allElements[count].bigImage = bigImg5_3;
                    } 
                    break;
                case 10:
                    if (element.complect == 2) {
                        allElements[count].style.backgroundImage = `url(${img10_2})`;
                        allElements[count].image = `url(${img10_2})`;                        
                        allElements[count].bigImage = bigImg10_2;                         
                    } else if (element.complect == 3) {
                        allElements[count].style.backgroundImage = `url(${img10_3})`;
                        allElements[count].image = `url(${img10_3})`;                        
                        allElements[count].bigImage = bigImg10_3; 
                    }                
                    break;    
            }
            count++; 
        });    
    }
    if ((type == 0 || type == 2) && data.length) {
        const allEls = (type) ? document.querySelectorAll('#field2 .preview') : document.querySelectorAll('#all-items .preview');
        
        Array.from(allEls).filter(el => ('parameters' in el) && el.parameters.now).forEach(el => {
            const newEl = document.createElement('span');
            newEl.textContent ='Одета';
            newEl.classList.add('important-text');
            el.prepend(newEl);
        });
    }

    if (type == 1) {

        let max = 0;
        
        data.filter(el => el.now instanceof Array).forEach(el => {
            if (el.now.sort()[el.now.length - 1] > max) {
                max = el.now.sort()[el.now.length - 1];
            }
        });
        
        document.getElementById('item-all3').innerHTML = max;
        document.getElementById('item-now3').innerHTML = numNow;
        if (numNow == 1) {
            document.getElementById('decrease3').classList.add('disabled');
        } else {
            document.getElementById('decrease3').classList.remove('disabled');
        }
        if (numNow == max) {
            document.getElementById('increase3').classList.add('disabled');
        } else {
            document.getElementById('increase3').classList.remove('disabled');
        }
    }

}