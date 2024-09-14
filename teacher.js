document.getElementById('saveStatus').addEventListener('click', function() {
    const statuses = [];

    // ดึงชื่อใบงานจากฟอร์ม
    const assignmentName = document.getElementById('assignmentTitle').value;

    students.forEach(student => {
        const status = document.querySelector(`.status[data-id="${student.id}"]`).value;
        const comment = document.querySelector(`.comment[data-id="${student.id}"]`).value;
        const timeChecked = document.querySelector(`.time-checked[data-id="${student.id}"]`).textContent;

        // บันทึกข้อมูลชื่อนักเรียนและข้อมูลอื่น ๆ ที่จำเป็น รวมถึงชื่อใบงาน
        statuses.push({
            studentId: student.id,
            studentName: student.name, // บันทึกชื่อนักเรียน
            assignmentName: assignmentName, // บันทึกชื่อใบงาน
            status: status,
            comment: comment,
            timeChecked: timeChecked
        });
    });

    // เก็บข้อมูลทั้งหมดใน localStorage
    localStorage.setItem('studentStatuses', JSON.stringify(statuses));
    alert('บันทึกสถานะการตรวจงานเรียบร้อย');
});
