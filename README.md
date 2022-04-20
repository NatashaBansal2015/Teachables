# Teachables

Introduction:
The goal of this CST is to help a person sit in the right posture sans lethargy to help them get their work done in time crunch as well as in expanded amount of time. Additionally, would also act as an alarm for distressed ‘pose’. This CST is designed in such a way, that it is very customizable to individual needs and can be modified without having much knowledge of programming and the Google Teachable Machine. Unlike the interaction techniques already existing in this rapidly advancing technological world, such as smartwatches, drones, robots, VR games, etc. there is a limitation with them: that one can only use the features provided by the company. My design is novel in way that one can customize it subject to their individual needs and requirements, and free of cost- available as a free source code globally. It can also be customized to a person with disabilities such a person with cerebral palsy, paraplegia, etc. and additional features can be added depending on their needs. This CST is very user friendly and will be especially useful for people wanting to work in a time crunch as well as by healthcare workers to monitor a person’s activity by visually seeing their mobility and also hearing the audio.


For the purpose of accuracy, I have set 0.75 as the probability for the current pose/action taking place. I have 5 case sets for my CST design-
Awake: When a person is actively working on their work station (laptop/computer)
Left: When a person is in a state of lethargy (may or may not be sleeping) and their head tilts on left side
Right: When a person is in a state of lethargy (may or may not be sleeping) and their head tilts on right side
Timeout: When a person wants to take a break, they signal a 45-degree angle made with their left hand
Inactive: When the person is absent from the screen


When a person is actively working on the computer, the machine reads it as a greater than 0.75 probability. When it is in lethargy mode- Left, Right or Inactive, it sends signal to the Arduino board thereby setting off an alarm (here also the probability = 0.75).
