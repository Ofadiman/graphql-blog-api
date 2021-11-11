FROM node:16.6.2-buster

ARG user_id
ARG group_id
ARG user
ARG project_dir=/app

RUN mkdir -p ${project_dir}
RUN mkdir -p /etc/sudoers.d/
RUN mkdir -p /home/${user} && \
    echo "${user}:x:${user_id}:${group_id}:${user},,,:/home/${user}:/bin/bash" >> /etc/passwd && \
    echo "${user}:x:${user_id}:" >> /etc/group && \
    echo "${user} ALL=(ALL) NOPASSWD: ALL" > "/etc/sudoers.d/${user}" && \
    chmod 0440 /etc/sudoers.d/${user} && \
    chown ${user_id}:${group_id} -R /home/${user} && \
    chown ${user_id}:${group_id} -R ${project_dir}

USER "${user}"

WORKDIR "${project_dir}"
