let tab=[];
let sorting=false;

let tabSave=[1,2,1,1,2,1,2,2,0,1,2,2,1,2,1,1,2,0,1,2,2,1,2,2,1,1,0,1,2,2,1,2,2,1,1,0,1,2,2,1,2,1,1,2,0,1,2,2,1,1,1,1,2,0,1,2,2,1,2,2,2,1,0,1,1,2,1,1,1,1,1,0,1,2,1,1,2,1,1,1,0,1,2,1,1,1,1,1,2,0,1,2,1,2,1,1,2,1,0,1,2,1,2,1,1,2,1,0,1,2,1,1,2,2,2,2,0,1,2,1,1,2,1,1,2,0,1,2,1,2,1,1,2,2];

let inputSize=document.getElementById("size");
let inputSpeed=document.getElementById("speed");


window.onload=function(){
	createArray(inputSize.value);
	showArray();
}



function createArray(length){
	tab=[];
	for(let i=0;i<length;i++){
		tab[i]=Math.floor(1+Math.random()*100);
	}
}

function showArray(){
	let container=document.getElementById("arrayContainer");
	for(let i=0;i<tab.length;i++){
		let block=document.createElement("div");
		block.classList.add("arrayBlock");
		block.dataset.value=tab[i].toString();
		block.dataset.place=i.toString();
		block.addEventListener("mouseover", mouseOver);
		block.addEventListener("mouseout", mouseOut);
		block.style.height=tab[i]*8+"px";
		container.appendChild(block);
	}
}

function deleteArray(){
	document.getElementById("arrayContainer").innerHTML="";
}

function mouseOver(){
	this.style.backgroundColor="red";
	document.getElementById("selector").innerText=this.dataset.value;
}

function mouseOut(){
	this.style.backgroundColor="cyan";
	document.getElementById("selector").innerText="";
}

function generateArray(){
	if(sorting){
		return;
	}
	deleteArray();
	createArray(inputSize.value);
	showArray();
}




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function selectionSort(){
	for(let i=0;i<tab.length;i++){
		document.querySelector('[data-place="'+i+'"]').style.backgroundColor="green";
		await sleep(10*(100/(inputSpeed.value)));
		let min=i;
		for(let j=i+1;j<tab.length;j++){
			if(tab[j]<tab[min]){
				min=j;
			}
		}
		if(min!=i){
			[tab[i], tab[min]]=[tab[min], tab[i]];
			deleteArray();
			showArray();
			document.querySelector('[data-place="'+min+'"]').style.backgroundColor="green";
			await sleep(10*(100/(inputSpeed.value)));
			document.querySelector('[data-place="'+min+'"]').style.backgroundColor="cyan";
		}
	}
	sorting=false;
}

async function bubbleSort() {
	for(let i=0;i<tab.length;i++){ 
		for (let j=0;j<(tab.length-i-1);j++){
			if(tab[j]>tab[j+1]){
				[tab[j+1],tab[j]]=[tab[j],tab[j+1]];
				deleteArray();
				showArray();
				await sleep(10*(100/(inputSpeed.value)));
			}
		}
	}
	sorting=false;
}

async function insertionSort(){
	for(let i=1;i<tab.length;i++){
	let currentEl=tab[i];
	let j;
	for(j=i-1;j>=0 && tab[j]>currentEl;j--){
		tab[j+1]=tab[j];
		deleteArray();
		showArray();
		await sleep(10*(100/(inputSpeed.value)));
	}
	tab[j+1]=currentEl;
	deleteArray();
	showArray();
	await sleep(10*(100/(inputSpeed.value)));
	}
	sorting=false;
}



function loadPreviousArray(){
	if(sorting){
		return;
	}
	tab=[...tabSave];
	deleteArray();
	showArray();
}

function sortArray(){
	if(sorting){
		return;
	}
	tabSave=[...tab];
	compCounter=0;
	sorting=true;
	let sort=document.getElementById("sortSelect").value;
	switch(sort){
		case "selection":
			selectionSort();
			break;
		case "bubble":
			bubbleSort();
			break;
		case "insertion":
			insertionSort();
			break;
	}
}
