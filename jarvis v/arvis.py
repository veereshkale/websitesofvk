import speech_recognition as sr
import pyttsx3
import os
import datetime
import subprocess
import webbrowser
import wikipedia
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

recognizer = sr.Recognizer()
engine = pyttsx3.init()


def speak(text):
    engine.say(text)
    engine.runAndWait()
    
def wishme():

    hour = int(datetime.datetime.now().hour)
    if hour >=0 and hour<12:
        speak("good morning sir")
    elif hour>=12 and hour<18:
        speak("good afternoon sir!")
    else:
        speak("good evening sir")
        
    speak("Hi sir iam your jarvis, Please tell me how may i can Help you ")        
           
    
    
def listen_command():
    try:

        with  sr.Microphone() as source:
            print("listening...")
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source)
            command =recognizer.recognize_google(audio).lower()
            print(f"you said: {command}")
            return command 
    except sr.UnknownValueError:
        speak("sorry, I didn't catch that please repeat..")
        return None
    
def play_youtube_video(search_term):
    driver =webdriver.Chrome() 
    
    driver.get("https://www.youtube.com")
    
    search_box = driver.find_element(By.NAME,"search_query")   
    search_box.send_keys(search_term)
    search_box.send_keys(Keys.RETURN)
    
    time.sleep(3)
    
    video_titles=driver.find_element_by_xpath(By.XPATH,)
    titles = [video.get_attribute("title") for video in video_titles]
    
    speak("I found these videos.Please choose which one to play: ")
    
    for i, title in enumerate(titles, 1):
        print(f"{i}: {title}")
        speak(f"Number {i}: {title}")
    
    # Ask which video to play
    speak("Which video would you like to play? Please say the number.")
    selected_number = listen_command()
    
    try:
        selected_index = int(selected_number) - 1
        if 0 <= selected_index < len(video_titles):
            speak(f"Playing {titles[selected_index]}")
            video_titles[selected_index].click()
        else:
            speak("Invalid choice, playing the first video.")
            video_titles[0].click()
    except ValueError:
        speak("I didn't understand that. Playing the first video.")
        video_titles[0].click()
        
        

wishme()
    
command = listen_command()      

if command:
    print(f"recognized command: {command}")
    if "open notepad" in command:
        speak("Opening Notepad.")
        os.system("notepad.exe")
    elif "open google" in command:
        speak("Opening Google.")
        subprocess.run(["start", "chrome"], shell=True)
    elif "open youtube" in command and "play" in command:
        search_term = command.replace("open youtube and play", "").strip()
        print(f"searching term for youtube: {search_term}.")
        speak(f"searching youtbe for{search_term}.")
        # Open YouTube with search results for the song or video
        play_youtube_video(search_term)
        # webbrowser.open(f"https://www.youtube.com/results?search_query={search_term}")

    elif "search wikipeadia for" in command:
        search_term = command.replace("search wikipedia for","").strip()
        result = wikipedia.summary(search_term,sentences=2) 
        speak(f"according to wikipedia,{result}")
    else:
        speak("sorry,I cannot perform this task")         
        
