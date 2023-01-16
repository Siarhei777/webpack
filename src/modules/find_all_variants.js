/*******************************************************/
/*Search for all matches of kits with given parameters.*/
/*******************************************************/
import show from "./create_info_panel";
import showPers from './init_elements';
import { beginData } from "./main";
import changeAll from "./change_all";
import {clearComplect} from "./clear_components";
import modifyParameters from "./modify_parameters";
const result = [];

const findAllVariants = () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'findAllVariants') return;

    const progress = document.getElementById('main-spinner');

    const changeVisibleElements = (text, storage, visible, infoVisible, val = 0) => {
        localStorage.setItem('checkDataReady', storage);        
        (visible) ? progress.classList.remove('hidden') : progress.classList.add('hidden');
        progress.querySelector('.progress-bar').style.width = `${val}%`;
        progress.querySelector('.progress-bar').setAttribute('aria-valuenow', val);        
        progress.querySelector('.progress__info').classList.remove('hidden');
        progress.querySelector('.progress__info').innerHTML = text;

    }

    result.length = 0;

    const allData = document.querySelectorAll('.control-data__input input');      
    localStorage.setItem('check', 'all');
    
    const forms = Array.from(allData).map(el => {
        return {
            value: el.value,
            name: el.name,
            command: (el.classList.contains('command') ? true : false)    
        }
    })
    

    const modData = beginData.map(el => modifyParameters(el));
    console.log(modData);
    document.getElementById('main-spinner').style.animationName = '';

    let countVal = 0;

    if (typeof Worker !== 'undefined') {        

        const myWorker = new Worker('modules/web_worker.js');
        
        console.time('val1');

        const dataWorker = {
            object: modData,         
            forms,   
            func: 'find_all_variants'
        };

        console.time('val2');

        myWorker.postMessage(dataWorker);

        myWorker.onmessage = function(e) {            
            if (e.data) {
                if (typeof e.data == 'number') {
                    changeVisibleElements(`Подобрано: ${countVal}`, 'false', true, false, e.data);
                } else {
                    result.push(e.data);    
                    ++countVal;
                }                
            } else {
                changeVisibleElements(`Подобрано: ${countVal}`, 'false', true, false, e.data);
                myWorker.terminate();    
                localStorage.setItem('result', null);
                console.timeEnd('val2');

                document.getElementById('main-spinner').style.animationName = 'slowHide';
    
                setTimeout(() => {
                    changeVisibleElements('', 'true', false, true);
                }, 2000);

                if (result.length) {
                    document.getElementById('count-parameters').classList.remove('hide');
                    showPers(beginData.filter((el, ind) => result[0].num.indexOf(ind) !== -1), 2);
                    changeAll(result[0].num);
                    show('count-parameters', result[0]);
                    document.getElementById('item-now').innerHTML = 1;
                    document.getElementById('item-all').innerHTML = result.length;
                    if (result.length > 1) {
                        document.getElementById('increase').classList.remove('disabled');
                    }
                } else {                    
                    document.getElementById('item-now').innerHTML = 0;
                    document.getElementById('item-all').innerHTML = 0;
                    document.getElementById('increase').classList.add('disabled');
                    document.getElementById('decrease').classList.add('disabled');
                    changeAll([]);
                    showPers([], 2);        
                    show('count-parameters', null);
                    clearComplect();
                }            
            }                                            
        }
        myWorker.onerror = (e) => {
            /*Add error info!!!*/
        }

    } else {             
        /*Add error info!!!*/
    }       
};

export { findAllVariants, result }