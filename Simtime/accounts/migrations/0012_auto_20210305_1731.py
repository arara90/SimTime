# Generated by Django 3.1.7 on 2021-03-05 08:31

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_auto_20210305_1643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profile_image',
            field=models.ImageField(blank=True, default='user-basic.png', upload_to=accounts.models.user_group_path),
        ),
    ]