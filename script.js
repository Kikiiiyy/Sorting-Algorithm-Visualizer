let tab=[];



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

function mouseOver(){
	this.style.backgroundColor="red";
	document.getElementById("selector").innerText=this.dataset.value;
}

function mouseOut(){
	this.style.backgroundColor="cyan";
	document.getElementById("selector").innerText="";
}

function deleteArray(){
	document.getElementById("arrayContainer").innerHTML="";
}

function generateArray(){
	deleteArray();
	createArray(inputSize.value);
	showArray();
}

let inputSize=document.getElementById("size");
let inputSpeed=document.getElementById("speed");

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
}
