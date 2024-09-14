<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ระบบนักเรียน</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .dashboard {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #2c2c2c;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            color: #f1f1f1;
        }
        h2 {
            color: #ffffff;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #333;
            color: #f1f1f1;
        }
        table, th, td {
            border: 1px solid #444;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #444;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <h2>สถานะการตรวจงาน</h2>
        <label for="subject-code">รหัสวิชา:</label>
        <input type="text" id="subject-code" placeholder="กรอกรหัสวิชา">
        <button id="check-status">ตรวจสอบสถานะ</button>
        <div id="status-container"></div>
        <button id="logout">ออกจากระบบ</button>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const subjectCodeInput = document.getElementById('subject-code');
            const statusContainer = document.getElementById('status-container');
            const checkStatusButton = document.getElementById('check-status');
            const logoutButton = document.getElementById('logout');

            // ข้อมูลนักเรียนตัวอย่าง
            const students = [
                { id: '01', name: 'กณวรรธน์' },
                    { id: '02', name: 'ชวิน' },
                    { id: '03', name: 'ณัฐกิตติ์' },
                    { id: '04', name: 'ณัฐดนัย' },
                    { id: '05', name: 'ตะติยะ' },
                    { id: '06', name: 'ปกรณ์' },
                    { id: '07', name: 'พัชรพล' },
                    { id: '08', name: 'อัครัชปรวีร์' },
                    { id: '09', name: 'อุดมทรัพย์' },
                    { id: '10', name: 'วนกฤษฏ์' },
                    { id: '11', name: 'ณัฐพล' },
                    { id: '12', name: 'วิทูร' },
                    { id: '13', name: 'กิตติ์พิมล' },
                    { id: '14', name: 'ชนัญญา' },
                    { id: '15', name: 'ชนิศา' },
                    { id: '16', name: 'ชุติกาญจน์' },
                    { id: '17', name: 'ณัฐณิชา' },
                    { id: '18', name: 'ณิชากานต์' },
                    { id: '19', name: 'ทิพย์รดา' },
                    { id: '20', name: 'ธนัชญา' },
                    { id: '21', name: 'ธิดารัตน์' },
                    { id: '22', name: 'ปัณฑิตา' },
                    { id: '23', name: 'บัณพร' },
                    { id: '24', name: 'เปมิกา' },
                    { id: '25', name: 'พิมพ์ชนก' },
                    { id: '26', name: 'พิรญา' },
                    { id: '27', name: 'ภัทรกานต์' },
                    { id: '28', name: 'ภัทร์นฤน' },
                    { id: '29', name: 'ภัทรวดี' },
                    { id: '30', name: 'วรกานต์' },
                    { id: '31', name: 'วรางคณา' },
                    { id: '32', name: 'ศิรินภา' },
                    { id: '33', name: 'ธาริณี' },
                    { id: '34', name: 'ศิริรัตน์' },
                    { id: '35', name: 'สุพรรณิการ์' },
                    { id: '36', name: 'วรัญญ์รัตน์' },
                    { id: '37', name: 'เขมจิรา' },
                    { id: '38', name: 'ชนกภัทร์' },
                    { id: '39', name: 'อรอนงค์' },
                    { id: '40', name: 'ประภาสิริ' }
                // ข้อมูลอื่นๆ...
            ];

            // ข้อมูลวิชาและงานที่สั่ง
            const assignments = [
                { subjectCode: 'MAT01', subjectName: 'คณิตศาสตร์', assignmentTitle: 'งานที่ 1' },
                { subjectCode: 'SCI01', subjectName: 'วิทยาศาสตร์', assignmentTitle: 'งานที่ 2' },
                // ข้อมูลอื่นๆ...
            ];

            // ฟังก์ชันตรวจสอบสถานะ
            function checkStatus() {
                const subjectCode = subjectCodeInput.value.trim();
                const currentStudentId = localStorage.getItem('loggedInStudentId'); // ดึง ID ของนักเรียนที่ล็อกอินจาก localStorage

                if (!currentStudentId) {
                    statusContainer.innerHTML = ''; // ลบข้อมูลใน statusContainer หากไม่ล็อกอิน
                    return;
                }

                // ดึงข้อมูลสถานะจาก localStorage
                const statuses = JSON.parse(localStorage.getItem('studentStatuses')) || [];
                // ตรวจสอบสถานะนักเรียนที่ล็อกอินตาม subjectCode
                const studentStatus = statuses.find(status => status.studentId === currentStudentId && status.subjectCode === subjectCode);
                // ดึงข้อมูลชื่อวิชาและชื่อของงาน
                const assignment = assignments.find(assign => assignment.assignmentName === subjectCode);

                if (!studentStatus) {
                    statusContainer.innerHTML = '<p>ไม่พบข้อมูลสำหรับรหัสวิชาที่ระบุ</p>';
                    return;
                }

                // ดึงข้อมูลชื่อนักเรียนจาก students array
                const student = students.find(student => student.id === currentStudentId);

                statusContainer.innerHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>รหัสวิชา</th>
                                <th>ชื่อวิชา</th>
                                <th>ชื่อของงาน</th>
                                <th>เลขที่</th>
                                <th>ชื่อ</th>
                                <th>สถานะ</th>
                                <th>คอมเมนต์</th>
                                <th>เวลาตรวจ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${subjectCode}</td>
                                <td>${assignment ? assignment.subjectName : 'ไม่พบข้อมูล'}</td>
                                <td>${assignment ? assignment.assignmentName : 'ไม่พบข้อมูล'}</td>
                                <td>${currentStudentId}</td>
                                <td>${student ? student.name : 'ไม่พบข้อมูล'}</td>
                                <td>${studentStatus.status || 'ไม่มีสถานะ'}</td>
                                <td>${studentStatus.comment || 'ไม่มีคอมเมนต์'}</td>
                                <td>${studentStatus.timeChecked || 'ไม่มีเวลา'}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            }

           
            function logout() {
                localStorage.removeItem('loggedInStudentId');
                alert('ออกจากระบบเรียบร้อยแล้ว');
                window.location.href = 'index.html'; 
            }

            checkStatusButton.addEventListener('click', checkStatus);
            logoutButton.addEventListener('click', logout);
        });
    </script>
</body>
</html>
