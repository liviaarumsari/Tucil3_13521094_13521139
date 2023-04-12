var prioqueue = [
    {
      nodes : [],
      count : 0
    }
  ]
  
function getLastElement(obj){
    console.log(obj)
    return obj.nodes[obj.nodes.length-1]
}

function newQueue(node,count){
    prioqueue[0].nodes = node;
    prioqueue[0].count = count;
}

function searchNodes(nodes, count){
    let node = nodes[nodes.length-1]
    for(let i = 0; i < prioqueue.length;i++){
        if(prioqueue[i].nodes.includes(node)){
            if(count < prioqueue[i].count){
                prioqueue.splice(i,1)
                prioqueue.push({nodes,count})
            }
        }
    }
}

function getNodes(adjMatrix,visited){
    let temp = prioqueue.shift();
    let length = temp.nodes.length
    let node = temp.nodes[length-1];
    for(let i = 0; i < adjMatrix.length;i++){
        if(parseInt(adjMatrix[node][i]) !== -1 && parseInt(adjMatrix[node][i])!== 0 && !temp.nodes.includes(i)){
            let nodes = temp.nodes.concat([i])
            let count = temp.count + parseInt(adjMatrix[node][i])
            if(!visited[i]){
                let newObj = {nodes,count}
                visited[i] = true
                prioqueue.push(newObj)
            }else{
                // Kondisi kalau misalnya sudah divisit, pertama cari jalur mana saja yang mengarah ke nodes yg diinginkan
                searchNodes(nodes,count)

            }
        
        }
    }
    prioqueue.sort((a,b) => a.count - b.count)
}

export default function ucs(adjMatrix, startNode, targetNode) {
    // Banyaknya nodes
    const numNodes = adjMatrix.length;
    let visited = Array(numNodes).fill(false);
    let start = [startNode];
    visited[startNode] = true;
    newQueue(start,0);
    getNodes(adjMatrix,visited);
    let i = 0;
    while(getLastElement(prioqueue[0]) !== targetNode && prioqueue.length !== 0){
        getNodes(adjMatrix,visited)
    }
    if(prioqueue.length === 0){
        return [prioqueue,-1];
    }else{
        return [prioqueue[0].nodes,prioqueue[0].count]
    }
}