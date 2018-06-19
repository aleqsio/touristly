# Generated by Django 2.0.5 on 2018-06-14 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('console_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personpreferencemodel',
            name='person',
        ),
        migrations.RemoveField(
            model_name='personpreferencemodel',
            name='question',
        ),
        migrations.RenameField(
            model_name='personmodel',
            old_name='name',
            new_name='aud',
        ),
        migrations.RemoveField(
            model_name='personmodel',
            name='email',
        ),
        migrations.AddField(
            model_name='personmodel',
            name='likes',
            field=models.ManyToManyField(related_name='likes', to='console_api.TouristSpotModel'),
        ),
        migrations.AddField(
            model_name='personmodel',
            name='skips',
            field=models.ManyToManyField(related_name='skips', to='console_api.TouristSpotModel'),
        ),
        migrations.AlterField(
            model_name='touristspotimagemodel',
            name='image',
            field=models.ImageField(null=True, upload_to='data/images/'),
        ),
        migrations.AlterField(
            model_name='touristspotmodel',
            name='key',
            field=models.CharField(default='tqxEwrilV48iqyiFybkL', max_length=20, primary_key=True, serialize=False),
        ),
        migrations.DeleteModel(
            name='HelperQuestionModel',
        ),
        migrations.DeleteModel(
            name='PersonPreferenceModel',
        ),
    ]
