const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    
root.innerHTML = `
<label><b>Search</b></label>
<input class="input" />
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput = debounce( async event => {
        const items = await fetchData(event.target.value);

        if(!items.length){ //removes dropdown when input form is cleared
            dropdown.classList.remove('is-active');
            return;
        }

        dropdown.classList.add('is-active');
        for (let item of items){
            
            const option = document.createElement('a');
            
            option.classList.add('dropdown-item');
            
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(option);
        }
        //console.log(movies);
}, 500);

input.addEventListener('input', onInput);

document.addEventListener('click', event => { //removes dropdown menu when user clicks on anything but the dropdown
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});
};