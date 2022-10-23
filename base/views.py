from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Programmer, Project, Skill, TechTools, Comment
from .serializer import CommentSerializer, ProgrammerSerializer, ProjectSerializer, SkillSerializer
from accounts.models import User
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_programmer_profile(request):
    user = request.user
    programmer = Programmer.objects.get(user=user)
    serializer = ProgrammerSerializer(programmer, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def programmer_profile(request):
    user = request.user
    data = request.data

    print(user)
    print(data)

    if Programmer.objects.filter(user=user).exists():
        print("here")
        programmer = Programmer.objects.get(user=user)
        programmer.first_name = data['first_name']
        programmer.last_name = data['last_name']
        programmer.phone = data['phone']
        programmer.gender = data["gender"], 
        programmer.address = data['address']
        programmer.speciality = data['speciality']
        programmer.about = data['about']
        programmer.git = data['git']
        programmer.website = data['website']
        programmer.twitter = data['twitter']
        programmer.linkedIn = data['linkedIn']
        programmer.avatar = request.FILES.get("avatar")
        programmer.save()
        serializer = ProgrammerSerializer(programmer, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print("there")
        programmer = Programmer.objects.create(
            user=user,
            first_name=data['first_name'], 
            last_name=data['last_name'],
            gender = data["gender"], 
            phone = data['phone'], 
            address = data['address'],
            speciality = data['speciality'],
            about = data['about'],
            git = data['git'], 
            website = data['website'],
            twitter = data['twitter'],
            linkedIn = data['linkedIn'],
            avatar = request.FILES.get("avatar")
        )

        serializer = ProgrammerSerializer(programmer, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(["GET"])
def programmers(request):
    query = request.query_params.get("query")
    if query == None:
        query = ''

    paginator = PageNumberPagination()
    paginator.page_size = 10
    programmers = Programmer.objects.filter(
        Q(first_name__icontains=query) | 
        Q(last_name__icontains=query) | 
        Q(skill__title=query)
    ).distinct()
    pages = paginator.paginate_queryset(programmers, request)
    serializer = ProgrammerSerializer(pages, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_new_skill(request):
    user = request.user
    data = request.data

    skill = Skill.objects.create(
        programmer = user.programmer, 
        title=data["title"], 
        description =data["description"], 
        level_of_mastery=data["level"]
    )
    serializer = SkillSerializer(skill, many=False)

    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_skill(request, slug):
    user = request.user
    data=request.data
    skill = Skill.objects.get(slug=slug)

    skill.programmer=user.programmer
    skill.title = data['title']
    skill.description = data['description']
    skill.level_of_mastery = data['level']
    skill.save()

    serializer = SkillSerializer(skill, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_skill(request, slug):
    user = request.user
    skill = Skill.objects.get(slug=slug)
    skill.delete()
    return Response({"message" :"Skill removed successfully "}, status=status.HTTP_200_OK)

# ! fetch projects

@api_view(['GET'])
def all_projects(request):
    query = request.query_params.get("query")
    if query == None:
        query = ''
    
    paginator = PageNumberPagination()
    paginator.page_size = 20
    projects = Project.objects.filter(
        Q(title__icontains=query) | 
        Q(description__icontains=query) | 
        Q(programmer__first_name__icontains=query) | 
        Q(programmer__last_name__icontains=query)
    ).distinct()
    pages = paginator.paginate_queryset(projects, request)
    serializer = ProjectSerializer(pages, many=True)
    return paginator.get_paginated_response(serializer.data)

# ! create projects
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_project(request):
    user = request.user
    data  = request.data

    techLenght = data['techLength']

    techLenght = int(techLenght)

    project  = Project.objects.create(
        programmer=user.programmer, 
        title=data['title'], 
        description=data['description'], 
        live_preview_link=data['live_preview_link'], 
        source_code_link=data["source_code_link"],
        cover_photo=request.FILES.get('cover_photo')
    )

    for i in range(techLenght):
        tools = "tools." + f"{i}." +"tool"
        name = data[tools]
        TechTools.objects.create(
            project=project, 
            name=name
        )

    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_project(request, slug):
    
    project = Project.objects.get(slug=slug)
    user = request.user
    data = request.data

    techLenght = data['techLength']
    techLenght = int(techLenght)

    project.programmer = user.programmer
    project.title = data['title']
    project.description = data['description']
    project.live_preview_link = data['live_preview_link']
    project.source_code_link = data['source_code_link']
    project.cover_photo = request.FILES.get('cover_photo')

    for j in project.techtools_set.all():
        j.delete()

    for i in range(techLenght):
        tools = "tools." + f"{i}." +"name"
        name = data[tools]
        TechTools.objects.get_or_create(
            project=project, 
            name=name
        )
    project.save()

    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_project(request, slug):
    user = request.user
    project = Project.objects.get(slug=slug)
    if user.programmer == project.programmer:
        project.delete()
        return Response({"message" : "project removed successfully "}, status=status.HTTP_200_OK)
    return Response({"message" : "you are not authorize to delete this project "}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def vote(request, slug):
    user = request.user
    data = request.data
    project = Project.objects.get(slug=slug)
    
    if data["vote"] == "up":
        project.down_vote.remove(user.programmer)
        project.up_vote.add(user.programmer)
    elif data["vote"] == "down":
        project.up_vote.remove(user.programmer)
        project.down_vote.add(user.programmer)
    project.save()
    return Response({"message" : "project voted"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, slug):
    user = request.user
    data = request.data
    project = Project.objects.get(slug=slug)

    comment = Comment.objects.create(
        project=project, 
        programmer=user.programmer, 
        comment=data["comment"]
    )
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def fetchAllComments(request, slug):
    project = Project.objects.get(slug=slug)
    comments = project.comment_set.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)



# ! fetch skills
@api_view(['GET'])
def getAllSkills(request):
    skills = Skill.objects.all()
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)