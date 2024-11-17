// Property descriptions and configurations
const propertyDescriptions = {
    container: {
        display: {
            description: "Defines the container as a flex container",
            values: {
                "flex": "Creates a block-level flex container",
                "inline-flex": "Creates an inline-level flex container",
                "none": "Removes the element from the document flow"
            },
            options: ['flex', 'inline-flex', 'none'],
            defaultValue: 'flex'
        },
        flexDirection: {
            description: "Establishes the main-axis, defining the direction flex items are placed",
            values: {
                "row": "Items are placed left to right (default)",
                "row-reverse": "Items are placed right to left",
                "column": "Items are placed top to bottom",
                "column-reverse": "Items are placed bottom to top"
            },
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
            defaultValue: 'row'
        },
        justifyContent: {
            description: "Defines alignment along the main axis",
            values: {
                "flex-start": "Items are packed toward the start",
                "flex-end": "Items are packed toward the end",
                "center": "Items are centered along the line",
                "space-between": "Items are evenly distributed with first item at start, last at end",
                "space-around": "Items are evenly distributed with equal space around them",
                "space-evenly": "Items are distributed so that spacing between any two items is equal"
            },
            options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
            defaultValue: 'flex-start'
        },
        alignItems: {
            description: "Defines alignment along the cross axis",
            values: {
                "flex-start": "Items are placed at the start of the cross axis",
                "flex-end": "Items are placed at the end of the cross axis",
                "center": "Items are centered on the cross axis",
                "stretch": "Items are stretched to fill the container (default)",
                "baseline": "Items are aligned by their baselines"
            },
            options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
            defaultValue: 'stretch'
        },
        alignContent: {
            description: "Aligns flex container's lines when there is extra space in the cross axis",
            values: {
                "flex-start": "Lines packed to the start",
                "flex-end": "Lines packed to the end",
                "center": "Lines packed to the center",
                "stretch": "Lines stretch to fill the container",
                "space-between": "Lines evenly distributed with first line at start, last at end",
                "space-around": "Lines evenly distributed with equal space around each line"
            },
            options: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'],
            defaultValue: 'stretch'
        },
        flexWrap: {
            description: "Controls whether items should wrap or not",
            values: {
                "nowrap": "All items will be on one line (default)",
                "wrap": "Items wrap onto multiple lines, from top to bottom",
                "wrap-reverse": "Items wrap onto multiple lines, from bottom to top"
            },
            options: ['nowrap', 'wrap', 'wrap-reverse'],
            defaultValue: 'nowrap'
        }
    },
    items: {
        order: {
            description: "Controls the order in which items appear in the flex container",
            values: {
                "number": "Default is 0. Items are arranged in ascending order."
            },
            options: ['-1', '0', '1', '2'],
            defaultValue: '0',
            isItemProperty: true
        },
        flexGrow: {
            description: "Determines how much the item will grow relative to other items",
            values: {
                "number": "Default is 0. Specifies the growth factor relative to other items."
            },
            isGrowShrink: true,
            defaultValues: [0, 1, 0]
        },
        flexShrink: {
            description: "Determines how much the item will shrink relative to other items",
            values: {
                "number": "Default is 1. Specifies the shrink factor relative to other items."
            },
            isGrowShrink: true,
            defaultValues: [1, 1, 1]
        },
        alignSelf: {
            description: "Allows the default alignment to be overridden for individual items",
            values: {
                "auto": "Inherit the parent container's align-items value",
                "flex-start": "Item is placed at the start of the cross axis",
                "flex-end": "Item is placed at the end of the cross axis",
                "center": "Item is centered on the cross axis",
                "stretch": "Item is stretched to fill the container",
                "baseline": "Item is aligned by its baseline"
            },
            options: ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
            defaultValue: 'auto',
            isItemProperty: true
        }
    }
};

// Toggle section visibility
function toggleSection(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    const chevron = document.getElementById(`${sectionId}-chevron`);
    section.classList.toggle('active');
    chevron.classList.toggle('active');
}

// Create regular example
function createExample(property, options, defaultValue, container = true) {
    const example = document.createElement('div');
    example.className = 'example';

    // Create buttons
    const buttonsGroup = document.createElement('div');
    buttonsGroup.className = 'buttons-group';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = `option-button ${option === defaultValue ? 'active' : ''}`;
        button.textContent = option;
        button.onclick = () => {
            buttonsGroup.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateExample(demoContainer, property, option, container);
            updateCodeDisplay(codeDisplay, property, option, container);
        };
        buttonsGroup.appendChild(button);
    });

    // Create demo container
    const demoContainer = document.createElement('div');
    demoContainer.className = 'demo-container';
    demoContainer.style.display = 'flex';
    if (container) {
        demoContainer.style[property] = defaultValue;
    }

    // Create demo boxes
    for (let i = 1; i <= 3; i++) {
        const box = document.createElement('div');
        box.className = 'demo-box';
        box.textContent = i;
        if (!container && i === 2) {
            box.style[property] = defaultValue;
        }
        demoContainer.appendChild(box);
    }

    // Create code display
    const codeDisplay = document.createElement('div');
    codeDisplay.className = 'code-display';
    updateCodeDisplay(codeDisplay, property, defaultValue, container);

    example.appendChild(buttonsGroup);
    example.appendChild(demoContainer);
    example.appendChild(codeDisplay);
    return example;
}

// Create grow/shrink example
function createGrowShrinkExample(property) {
    const example = document.createElement('div');
    example.className = 'example';

    // Create input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    const values = new Array(3).fill(property === 'flexGrow' ? 0 : 1);
    values[1] = property === 'flexGrow' ? 1 : 1;

    // Create inputs for each box
    for (let i = 0; i < 3; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        
        const label = document.createElement('span');
        label.textContent = `Box ${i + 1}:`;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '10';
        input.value = values[i];
        input.className = 'number-input';
        
        input.onchange = (e) => {
            values[i] = Number(e.target.value);
            updateGrowShrinkExample(demoContainer, property, values);
            updateGrowShrinkCode(codeDisplay, property, values);
        };

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        inputGroup.appendChild(wrapper);
    }

    // Create demo container
    const demoContainer = document.createElement('div');
    demoContainer.className = 'demo-container';
    demoContainer.style.display = 'flex';

    // Create demo boxes
    for (let i = 0; i < 3; i++) {
        const box = document.createElement('div');
        box.className = 'demo-box';
        box.textContent = i + 1;
        box.style[property] = values[i];
        demoContainer.appendChild(box);
    }

    // Create code display
    const codeDisplay = document.createElement('div');
    codeDisplay.className = 'code-display';
    updateGrowShrinkCode(codeDisplay, property, values);

    example.appendChild(inputGroup);
    example.appendChild(demoContainer);
    example.appendChild(codeDisplay);
    return example;
}

// Update example display
function updateExample(container, property, value, isContainer) {
    if (isContainer) {
        container.style[property] = value;
    } else {
        container.querySelectorAll('.demo-box')[1].style[property] = value;
    }
}

// Update code display for regular examples
function updateCodeDisplay(codeDisplay, property, value, isContainer) {
    const selector = isContainer ? '.container' : '.item';
    codeDisplay.innerHTML = `
        <pre><code>${selector} {
    ${property}: ${value};
}</code></pre>`;
}

// Update grow/shrink example
function updateGrowShrinkExample(container, property, values) {
    const boxes = container.querySelectorAll('.demo-box');
    boxes.forEach((box, index) => {
        box.style[property] = values[index];
    });
}

// Update grow/shrink code display
function updateGrowShrinkCode(codeDisplay, property, values) {
    codeDisplay.innerHTML = `
        <pre><code>.item-1 {
    ${property}: ${values[0]};
}
.item-2 {
    ${property}: ${values[1]};
}
.item-3 {
    ${property}: ${values[2]};
}</code></pre>`;
}

// Initialize examples
function initializeExamples() {
    // Container properties
    Object.entries(propertyDescriptions.container).forEach(([property, config]) => {
        const section = document.getElementById('container-section');
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        
        const title = document.createElement('h3');
        title.textContent = property;
        
        const description = document.createElement('p');
        description.textContent = config.description;
        
        propertyDiv.appendChild(title);
        propertyDiv.appendChild(description);
        propertyDiv.appendChild(createExample(property, config.options, config.defaultValue, true));
        
        section.appendChild(propertyDiv);
    });

    // Item properties
    Object.entries(propertyDescriptions.items).forEach(([property, config]) => {
        const section = document.getElementById('items-section');
        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        
        const title = document.createElement('h3');
        title.textContent = property;
        
        const description = document.createElement('p');
        description.textContent = config.description;
        
        propertyDiv.appendChild(title);
        propertyDiv.appendChild(description);
        
        if (config.isGrowShrink) {
            propertyDiv.appendChild(createGrowShrinkExample(property));
        } else {
            propertyDiv.appendChild(createExample(property, config.options, config.defaultValue, false));
        }
        
        section.appendChild(propertyDiv);
    });
}

// Initialize the demo when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeExamples);