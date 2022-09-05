# CMakeList.txt : Top-level CMake project file, do global configuration
# and include sub-projects here.

# CMake requirements.
cmake_minimum_required (VERSION 3.15)
set(CMAKE_TOOLCHAIN_FILE "${CMAKE_CURRENT_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "Vcpkg toolchain file")

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

# Add packages (including IntelliSense) to the project.
find_package (asio CONFIG REQUIRED)
find_package (ASIOSDK REQUIRED)
find_package (CppUnit CONFIG REQUIRED)
find_package (Doxygen REQUIRED)
find_package (fmt CONFIG REQUIRED)
find_package (Git REQUIRED)
find_package (JUCE CONFIG REQUIRED)
find_package (Lua REQUIRED)
find_package (Msys REQUIRED)
find_package (portaudio CONFIG REQUIRED)
find_package (portmidi CONFIG REQUIRED)
find_package (portsmf CONFIG REQUIRED)

#add_subdirectory (Biquads)
#add_subdirectory (JUCE)
add_subdirectory (ConsoleApplication)
add_subdirectory (CMakeProject1)
add_subdirectory (StoneyDSP)

# Host handling
if(WIN32)
    add_compile_definitions(WINDOWS=1)
endif ()

if (UNIX AND NOT APPLE)
    add_compile_definitions(LINUX=1)
endif ()

if (APPLE)
    add_compile_definitions(APPLE=1)
endif ()

if(${CMAKE_BUILD_TYPE} MATCHES Debug)
    add_compile_definitions(_DEBUG=1)
else()
    add_compile_definitions(NDEBUG=1)
endif(${CMAKE_BUILD_TYPE} MATCHES Debug)

# Export options
#set(CMAKE_EXPORT_COMPILE_COMMANDS on)
#set(CMAKE_ENABLE_EXPORTS on)

# Add tests and install targets if needed. Comment out if not required.
#include(CPACK)
#include(CTest)

# Enable testing. Comment out if not required.
enable_testing()
