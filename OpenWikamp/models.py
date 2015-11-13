from django.db import models

# Post's model


class Post(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()


def publish_post(self):
    self.save()


def __str__(self):
    return self.title

# Subject's model


class Subject(models.Model):
    title = models.CharField(max_length=200)
    head_teacher = models.ForeignKey('auth.User')
    description = models.TextField()


def publish_subject(self):
    self.save()


def delete_subject(self):
    self.delete()


class Schedule(models.Model):
    subject = models.ForeignKey('Subject', related_name='schedules')
    teacher = models.ForeignKey('auth.User')
    date = models.DateField()
    from_time = models.DateTimeField()
    to_date = models.DateTimeField()
    classroom = models.CharField(max_length=20)


def publish_schedule(self):
    self.save()


def delete_schedule(self):
    self.delete()


class Lesson(models.Model):
    subject = models.ForeignKey('Subject', related_name='lessons')
    title = models.CharField(max_length=200)
    description = models.TextField()


def publish_lesson(self):
    self.save()


def delete_lesson(self):
    self.delete()


class Activity(models.Model):
    lesson = models.ForeignKey('Lesson', related_name='activities')
    title = models.CharField(max_length=200)
    description = models.TextField()

def publish_activity(self):
    self.save()

def delete_activity(self):
    self.delete()


# class ActivityFile(models.Model):
#     activity = models.ForeignKey('Lesson')
#     title = models.CharField(max_length=200)
#     expired = models.DateTimeField()
#     file = models.FileField()
#
#
# def publish_activity_file(self):
#     self.save()
#
#
# def delete_activity_file(self):
#     self.delete()

# class ActivityTask(models.Model):
#     activity = models.ForeignKey('Activity')
#     title
