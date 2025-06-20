---

# 🧑‍🎓 Student Progress Management System – Built by Me

A full-stack MERN web application designed to help educators and organizations track the **competitive programming performance of students** using Codeforces data. The system is feature-rich and includes automated data syncing, inactivity detection, and visual analytics.

---

## 🎥 Project Demo

You can watch the **complete working demonstration** of the project here:
👉 **[Click to Watch Demo Video](https://drive.google.com/file/d/1Y0UAli80FIK-zE0d5KYdVvGd3PmstD0H/view?usp=sharing)**

> 🔹 The video walks through all features of the application, including adding/editing students, viewing progress analytics, Codeforces syncing, and more.

---

## 📌 Project Overview

This system was built as part of a hiring assignment for **TLE Eliminators**. It provides a centralized platform to:

* Track Codeforces ratings, contests, and problem-solving statistics for students
* Visualize performance with graphs and heatmaps
* Automate data syncing and email notifications
* Manage student records through a clean and responsive UI

---

## 🛠️ Tech Stack

| Category       | Technology                                 |
| -------------- | ------------------------------------------ |
| **Frontend**   | React.js, TailwindCSS                      |
| **Backend**    | Node.js, Express.js                        |
| **Database**   | MongoDB                                    |
| **Automation** | Python (for Cron jobs & Emails)            |
| **Visuals**    | Recharts, Chart.js, React Calendar Heatmap |
| **Emailing**   | Python SMTP (Nodemailer alternative)       |

---

## 🔧 Features

### 🎓 Student Table View

* View and manage all student records
* Details include:

  * Name, Email, Phone Number
  * Codeforces Handle, Current Rating, Max Rating
* Add / Edit / Delete functionality
* Export all data to CSV
* “View Details” button for deeper insights

---

### 📊 Student Profile View

#### 🔹 **Contest History**

* Filters: 30, 90, 365 days
* Shows:

  * Rating graph
  * Contest list with ranks, rating changes
  * Problems not yet solved from past contests

#### 🔹 **Problem Solving Stats**

* Filters: 7, 30, 90 days
* Metrics shown:

  * Most difficult problem solved
  * Total problems solved
  * Average rating and problems per day
  * Bar chart of rating buckets
  * Submission heatmap (calendar-based)

---

### 🔄 Codeforces Data Sync

* **Automated daily sync** at 2 AM using Python cron job
* No real-time API calls during user interaction hours
* Shows **"last updated"** time for each student
* If a Codeforces handle is updated, it triggers an **immediate data refresh**

---

### 🚨 Inactivity Detection & Emailing

* After each sync:

  * Identifies students with **no submissions in the last 7 days**
  * Sends **automatic reminder emails**
  * Tracks number of emails sent
  * Option to **disable auto-email** per student

---

### 🌗 Bonus Features

* Responsive UI (mobile + tablet)
* Clean UI with TailwindCSS
* Reusable components and modular backend
* Easy-to-maintain Python-based automation

---

## 📝 Final Notes

This project was built completely by me from scratch as a demonstration of my **full-stack MERN development skills**, along with backend automation and third-party API integration. While the live link is optional, the entire system works perfectly and is demonstrated clearly in the provided video.

---
