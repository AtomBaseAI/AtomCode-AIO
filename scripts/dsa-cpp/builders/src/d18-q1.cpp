#include <bits/stdc++.h>
using namespace std;

int content_children(std::vector<int> greed, std::vector<int> cookies) {
    std::sort(greed.begin(), greed.end());
    std::sort(cookies.begin(), cookies.end());
    int child = 0;
    for (int c = 0; c < (int)cookies.size() && child < (int)greed.size(); c++)
        if (cookies[c] >= greed[child]) child++;
    return child;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> greed(n);
    for (int& x : greed) cin >> x;
    int m;
    cin >> m;
    vector<int> cookies(m);
    for (int& x : cookies) cin >> x;
    cout << content_children(greed, cookies) << "\n";
    return 0;
}
