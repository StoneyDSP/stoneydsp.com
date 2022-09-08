# CMakeList.txt : Top-level CMake project file, do global configuration
# and include sub-projects here.

# CMake requirements.
cmake_minimum_required(VERSION 3.7...3.24)

if(${CMAKE_VERSION} VERSION_LESS 3.12)
    cmake_policy(VERSION ${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION})
endif()

# Toolchain location. Stores result in the CMakeCache.
set(CMAKE_TOOLCHAIN_FILE ${CMAKE_CURRENT_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake CACHE STRING "Toolchain file")

# Company/author name
set(CMAKE_COMPANY_NAME "StoneyDSP" CACHE STRING "Company Name")

set_property(GLOBAL PROPERTY USE_FOLDERS YES)

# The top-level CMakeLists.txt file for a project must contain a literal, direct call to the
# `project()` command. `project()` sets up some helpful variables that describe source/binary
# directories, and the current project version.
# This is a standard CMake command.
project (
	"StoneyDSP"
	VERSION 0.0.0.1
	HOMEPAGE_URL https://stoneydsp.github.io/html/index.html
	LANGUAGES C CXX
)

# Host handling:
if(WIN32)
    add_compile_definitions(WINDOWS=1)
    message(STATUS "Setting Compile Definition WINDOWS=1")
endif ()

if (UNIX AND NOT APPLE)
    add_compile_definitions(LINUX=1)
    message(STATUS "Setting Compile Definition LINUX=1")
endif ()

if (APPLE)
    add_compile_definitions(APPLE=1)
    message(STATUS "Setting Compile Definition APPLE=1")
endif ()

# Debug definitions:
if(${CMAKE_BUILD_TYPE} MATCHES Debug)
    add_compile_definitions(_DEBUG=1)
    message(STATUS "Setting Compile Definition _DEBUG=1")
else()
    add_compile_definitions(NDEBUG=1)
    message(STATUS "Setting Compile Definition NDEBUG=1")
endif(${CMAKE_BUILD_TYPE} MATCHES Debug)

# Check if we are in the top-level project or not:
if (NOT CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
    message(STATUS "[${PROJECT_NAME}] is a sub-project of [${CMAKE_PROJECT_NAME}]")
else()
    message(STATUS "[${CMAKE_PROJECT_NAME}] is a top-level project")
endif()

# Set install directory
if(DEFINED CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT)
    message(
        STATUS
        "CMAKE_INSTALL_PREFIX is not set\n"
        "Default value: ${CMAKE_INSTALL_PREFIX}\n"
        "Will set it to ${CMAKE_SOURCE_DIR}/install"
    )
    set(CMAKE_INSTALL_PREFIX
        "${CMAKE_SOURCE_DIR}/install"
        CACHE PATH "Where the library will be installed to" FORCE
    )
else()
    message(
        STATUS
        "CMAKE_INSTALL_PREFIX was already set\n"
        "Current value: ${CMAKE_INSTALL_PREFIX}"
    )
endif()

# Add packages (including IntelliSense) to the project.
find_package (asio CONFIG REQUIRED)
find_package (ASIOSDK REQUIRED)
find_package (CppUnit CONFIG REQUIRED)
#find_package (Doxygen REQUIRED)
find_package (fmt CONFIG REQUIRED)
find_package (Git REQUIRED)
#find_package (JUCE CONFIG REQUIRED)
find_package (Lua REQUIRED)
find_package (Msys REQUIRED)
find_package (portaudio CONFIG REQUIRED)
find_package (portmidi CONFIG REQUIRED)
find_package (portsmf CONFIG REQUIRED)

#add_subdirectory (Biquads)
#add_subdirectory (doxygen)
add_subdirectory (JUCE)
add_subdirectory (ConsoleApplication)
add_subdirectory (CMakeProject1)
add_subdirectory (StoneyDSP)

# Export options
#set(CMAKE_EXPORT_COMPILE_COMMANDS on)
#set(CMAKE_ENABLE_EXPORTS on)

# Add tests and install targets if needed. Comment out if not required.
#include(CPACK)
#include(CTest)

# Enable testing. Comment out if not required.
# enable_testing()
