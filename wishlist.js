
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function initialize()
{
    const d = new Date();
    const year = new Date().getFullYear();
    const isBDayList = (d <= new Date("May 21, " + year) || d > new Date("December 25, " + year));
    
    const headElement = document.getElementsByTagName("HEAD")[0];
    if (isBDayList)
    {
        const root = document.querySelector(':root');
        root.style.setProperty('--background-image', 'url(images/bday_background.png)');
        root.style.setProperty('--text-color', '#4d3528');
        root.style.setProperty('--body-background-color', '#e673ac');
        root.style.setProperty('--page-background-color', '#ff7fbf');
        root.style.setProperty('--section-background-color', '#ff99cc');
        root.style.setProperty('--hovered-item-background-color', '#ffb3d9');
        root.style.setProperty('--hovered-item-link-color', '#674635');
        root.style.setProperty('--hovered-subitem-background-color', '#ffcce6');
        root.style.setProperty('--hovered-subitem-link-color', '#805842');
    }
    const iconnode = document.createElement("link");
    iconnode.rel = "shortcut icon";
    iconnode.type = "image/x-icon";
    iconnode.href = "images/" + (isBDayList ? "bday" : "xmas") + "_icon.ico";
    headElement.insertBefore(iconnode, headElement.firstChild);
    
    const titleText = "Elizabeth's " + year + " " + (isBDayList ? "Birthday" : "Christmas") + " Wishlist";
    document.querySelector(".wishlist-title").innerHTML = titleText;
    
    if (typeof wishlistData !== "undefined")
    {
        console.log(wishlistData);
        transformData(wishlistData);
    }
    else
    {
        try
        {
            fetch("./wishlist.json")
                .then(response => {
                    if (!response.ok)
                    {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then(transformData)
                .catch(transformError);
        }
        catch(error)
        {
            transformError(error);
        }
    }
}

function transformData(data)
{
    const sectionsList = document.querySelector(".sections");
    sectionsList.removeAttribute("style");
    
    const sectionTemplate = document.getElementById("section-template");
    for (var i = 0; i < data.sections.length; ++i)
    {
        const section = document.importNode(sectionTemplate.content, true);
        transformSection(section.querySelector("li"), data.sections[i]);
        sectionsList.appendChild(section);
    }
    
    document.querySelector(".page-loader").style.display = "none";
}

function transformError(error)
{
    transformData({
        "sections":
        [
            {
                "name": "Unable to load data",
                "notes":
                [
                    error
                ]
            }
        ]
    });
}

function transformNameAndNotes(parentElement, data)
{
    const nameParagraph = parentElement.querySelector(".name");
    nameParagraph.innerHTML = data.name;
    if (Object.hasOwn(data, "notes") && data.notes.length > 0)
    {
        var noteParagraphs = [];
        for (var i = 0; i < data.notes.length; ++i)
        {
            const note = document.createElement("p");
            note.innerHTML = data.notes[i];
            noteParagraphs.push(note);
        }
        nameParagraph.after(...noteParagraphs);
    }
}

async function transformSection(sectionElement, sectionData)
{
    await delay(0);
    transformNameAndNotes(sectionElement, sectionData)
    
    if (Object.hasOwn(sectionData, "items") && sectionData.items.length > 0)
    {
        itemsList = sectionElement.querySelector(".items");
        itemsList.removeAttribute("style");
        
        const itemTemplate = document.getElementById("item-template");
        const groupTemplate = document.getElementById("group-template");
        for (var i = 0; i < sectionData.items.length; ++i)
        {
            const itemData = sectionData.items[i];
            if (Object.hasOwn(itemData, "items") && itemData.items.length > 0)
            {
                const group = document.importNode(groupTemplate.content, true);
                transformGroup(group.querySelector("li"), itemData);
                itemsList.appendChild(group);
            }
            else
            {
                const item = document.importNode(itemTemplate.content, true);
                transformItem(item.querySelector("li"), itemData);
                itemsList.appendChild(item);
            }
        }
    }
        
    sectionElement.querySelector(".section-loader").style.display = "none";
}

async function transformItem(itemElement, itemData)
{
    await delay(0);
    if (Object.hasOwn(itemData, "thumbnail"))
    {
        const imageWrapper = itemElement.querySelector(".imagewrapper");
        imageWrapper.querySelector("img").src = "images/" + itemData.thumbnail;
        imageWrapper.removeAttribute("style");
    }
    
    if (Object.hasOwn(itemData, "url"))
    {
        itemElement.querySelector("a").href = itemData.url;
    }
    
    transformNameAndNotes(itemElement, itemData);
    itemElement.querySelector(".content").removeAttribute("style");
        
    itemElement.querySelector(".item-loader").style.display = "none";
}

async function transformGroup(groupElement, groupData)
{
    await delay(0);
    transformNameAndNotes(groupElement, groupData);
    groupElement.querySelector(".content").removeAttribute("style");
    
    const subitemsList = groupElement.querySelector(".subitems");
    const subitemTemplate = document.getElementById("subitem-template");
    for (var i = 0; i < groupData.items.length; ++i)
    {
        const subitem = document.importNode(subitemTemplate.content, true);
        transformSubitem(subitem.querySelector("li"), groupData.items[i]);
        subitemsList.appendChild(subitem);
    }
    
    groupElement.querySelector(".item-loader").style.display = "none";
}

async function transformSubitem(subitemElement, subitemData)
{
    await delay(0);
    if (Object.hasOwn(subitemData, "thumbnail"))
    {
        const imageWrapper = subitemElement.querySelector(".imagewrapper");
        imageWrapper.querySelector("img").src = "images/" + subitemData.thumbnail;
        imageWrapper.removeAttribute("style");
    }
    
    if (Object.hasOwn(subitemData, "url"))
    {
        subitemElement.querySelector("a").href = subitemData.url;
    }
    
    transformNameAndNotes(subitemElement, subitemData);
    
    subitemElement.querySelector(".subitem-loader").style.display = "none";
}
