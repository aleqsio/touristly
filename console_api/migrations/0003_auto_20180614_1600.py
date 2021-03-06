# Generated by Django 2.0.5 on 2018-06-14 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('console_api', '0002_auto_20180614_1545'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='touristspotimagemodel',
            name='assigned_to',
        ),
        migrations.AddField(
            model_name='touristspotmodel',
            name='images',
            field=models.ManyToManyField(default=None, related_name='images', to='console_api.TouristSpotImageModel'),
        ),
        migrations.AlterField(
            model_name='personmodel',
            name='likes',
            field=models.ManyToManyField(default=None, related_name='likes', to='console_api.TouristSpotModel'),
        ),
        migrations.AlterField(
            model_name='personmodel',
            name='skips',
            field=models.ManyToManyField(default=None, related_name='skips', to='console_api.TouristSpotModel'),
        ),
        migrations.AlterField(
            model_name='touristspotmodel',
            name='key',
            field=models.CharField(default='FXIL5XD5GuzPpxzvnESy', max_length=20, primary_key=True, serialize=False),
        ),
    ]
