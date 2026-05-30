FROM nginx:alpine

# Copy the custom Nginx configuration for Clean URLs
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the pre-compiled static build files to Nginx public folder
COPY ./out /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
