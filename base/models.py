from email.policy import default
from enum import unique
from django.db import models
from accounts.models import User
from django.utils.text import slugify
import string
import random
# Create your models here.


def random_slug():
    return "".join(random.choice(string.ascii_letters + string.digits) for _ in range(10))


def project_random_slug():
    return "".join(random.choice(string.ascii_letters + string.digits) for _ in range(30))


class Programmer(models.Model):
    user  = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200, null=True,blank=True)
    last_name = models.CharField(max_length=200, null=True,blank=True)
    speciality = models.CharField(max_length = 200, null=True,blank=True)
    gender = models.CharField(max_length=120, null=True,blank=True)
    phone = models.CharField(max_length=20, null=True,blank=True)
    address = models.TextField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    # slug = models.SlugField(max_length=200, unique=True)
    # social accounts
    git = models.URLField(max_length=200, null=True,blank=True)
    twitter = models.URLField(max_length=200, null=True, blank=True)
    linkedIn = models.URLField(max_length=200, null=True, blank=True)
    website = models.URLField(max_length=200, null=True, blank=True)
    avatar = models.ImageField(upload_to="users/avatar", default="user.jpg")


    def __str__(self):
        return self.user.username


class Skill(models.Model):
    LEVEL = (
        ("Starter", "Starter"),
        ("Basic", "Basic"),
        ("Comfortable", "Comfortable"),
        ("Skillfull", "Skillfull"),
        ("Master", "Master"),
    )
    programmer = models.ForeignKey(Programmer, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    level_of_mastery = models.CharField(max_length=50, null=True, blank=True, choices=LEVEL)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(random_slug() + "-" + self.title)
        super(Skill, self).save(*args, **kwargs)

    
    def __str__(self):
        return self.title



class Project(models.Model):
    programmer  = models.ForeignKey(Programmer, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=250, unique=True)
    live_preview_link = models.URLField(max_length=250, null=True, blank=True)
    source_code_link = models.URLField(max_length=250, null=True, blank=True)
    cover_photo = models.ImageField(upload_to="projects/demo", default="project.jpg")
    created_at = models.DateTimeField(auto_now_add=True)
    up_vote = models.ManyToManyField(Programmer, null=True, blank=True, related_name="programmer_up")
    down_vote = models.ManyToManyField(Programmer, null=True, blank=True, related_name="programmer_down")


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(project_random_slug())
        super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class TechTools(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name



class Comment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    programmer = models.ForeignKey(Programmer, on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
    commented_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.programmer.first_name}'s comment on {self.project.title}"


class Vote(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    programmer = models.ForeignKey(Programmer, on_delete=models.CASCADE)
    vote = models.BigIntegerField(default=0)


    def __str__(self):
        return f"{self.programmer.first_name}'s vote on {self.project.title}"
