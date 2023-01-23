async function getInfo() {
    const busId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

    const stopNameElement = document.getElementById('stopName');
    const timetableElement = document.getElementById('buses');
    timetableElement.innerHTML = '';
    try {
        stopNameElement.textContent = 'Loading ...';
        const res = await fetch(url);
        
        if (res.status !== 200) {
            throw new Error('Stop Id not found');
        }

        const data = await res.json();
        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timetableElement.appendChild(li);
        });

    } catch (error) {
        
        stopNameElement.textContent = 'Error';
    }
}