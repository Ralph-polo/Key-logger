document.addEventListener('DOMContentLoaded', function () {
    const courseReps = [
        // Course reps
        {
            fullName: "Angela Gyasi",
            ID: "4121220303CR",
            room: "B1",
            phone: "+233244000001"
        },
        {
            fullName: "Nadia Gyasi",
            ID: "4121220312CR",
            room: "B1",
            phone: "+233244000001"
        },
        {
            fullName: "Ralph Tetteh",
            ID: "4111220043CR",
            room: "G7",
            phone: "+233244000001"
        },
        {
            fullName: "Kelvin Afriyie",
            ID: "4111220140CR",
            room: "C3",
            phone: "+233244000001"
        },
        {
            fullName: "Josephine Antwi",
            ID: "4111220077CR",
            room: "B4",
            phone: "+233244000001"
        },
    ];

    const staffs = [
        // Staff
        {
            fullName: "Claude Odoi",
            ID: "5111220077ST",
            staffdept: "conference-Room-1",
            phone: "+233244000001"
        }, {
            fullName: "Bernard Asante",
            ID: "5111220077ST",
            staffdept: "conference-Room-2",
            phone: "+233244000001"
        },
    ];

    const form = document.getElementById('access-form');
    const idInput = document.getElementById('id-input');
    const keyId = document.getElementById('keyID');
    const message = document.getElementById('message');
    const staffmessage = document.getElementById('staffmessage');
    let returnrecords = JSON.parse(localStorage.getItem('returnrecords')) || [];
    let returnrecords1 = JSON.parse(localStorage.getItem('returnrecords1')) || [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = idInput.value.trim();
        const keys = keyId.value.trim();
        const courseRep = courseReps.find(rep => rep.ID === id);
        const staff = staffs.find(dep => dep.ID === id);

        if (courseRep) {
            // Check if the key is a conference room key
            if (keys === 'conference-Room-1' || keys === 'conference-Room-2') {
                message.textContent = 'Access Denied: Course reps cannot return Staff Keys';
                message.style.color = 'red';
            } else {
                const time = new Date().toLocaleString();
                returnrecords.unshift({ id, time, keys, fullname: courseRep.fullName, phone: courseRep.phone, room: courseRep.room });
                localStorage.setItem('returnrecords', JSON.stringify(returnrecords));
                message.textContent = `Key Returned: ${courseRep.fullName}, Phone: ${courseRep.phone}`;
                message.style.color = 'green';
            }
        } else if (staff) {
            const time = new Date().toLocaleString();
            returnrecords1.unshift({ id, time, keys, sfullname: staff.fullName, sphone: staff.phone, dept: staff.staffdept });
            localStorage.setItem('returnrecords1', JSON.stringify(returnrecords1));
            staffmessage.textContent = `Key Returned: ${staff.fullName}, Phone: ${staff.phone}`;
            staffmessage.style.color = 'green';
        } else {
            message.textContent = 'Access Denied!!!!!!: Unauthorized ID';
            message.style.color = 'red';
            // staffmessage.textContent = 'Access Denied: Unauthorized ID';
            // staffmessage.style.color = 'red';
        }

        idInput.value = '';
        keyId.value = '';
    });
});
